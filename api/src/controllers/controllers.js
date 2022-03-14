const axios = require("axios")
const {Pokemon, Type} = require("../db.js")


async function getApi (value) { 
    const apiLink = await axios.get(`https://pokeapi.co/api/v2/pokemon/${value}`)
    const pokemonData = {
            id: apiLink.data.id,
            name: apiLink.data.name,
            hp: apiLink.data.stats[0].base_stat,
            attack: apiLink.data.stats[1].base_stat,
            defense: apiLink.data.stats[2].base_stat,
            speed: apiLink.data.stats[5].base_stat,
            weight: apiLink.data.weight,
            height: apiLink.data.height,
            types: apiLink.data.types.map(p => p.type.name ),
            img: apiLink.data.sprites.other.dream_world.front_default 
        }
    
    return pokemonData 
}

async function bringItAll (name) {
    
    if(name){
        try {
            const dataBaseResult = await Pokemon.findOne({  
                where: {name: name}, 
                attributes: ["id", "name", "attack", "img"], 
                include: { 
                    model: Type, 
                    attributes: ["name"],
                    through: {
                        attributes: []
                    }
                }
            })
            
            if(!dataBaseResult){ 
                const checkApi = await getApi(name)
                return checkApi
            } 

            return dataBaseResult

        } catch (error) {
            console.log(error) 
        }
    } else { 
        const apiLink = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=40%22"); 
        const searchingPokemon = await apiLink.data.results.map(p =>  {
            return axios.get(p.url) 
        })
        const catchThemAll = await Promise.all(searchingPokemon) 
        const pokeInfo = catchThemAll.map(p => {  
            return{ 
                name : p.data.name,
                img : p.data.sprites.other.dream_world.front_default,
                types : p.data.types.map((p) => p.type.name),
                attack: p.data.stats[1].base_stat,
                id: p.data.id
            }
        })

        
        const pokedexInfo = await Pokemon.findAll({   
            attributes: ["name", "img", "attack", "hp", "id", "isInDataBase"], 
            include: {
                model: Type, 
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
    })
    //console.log(pokeInfo) ... trae un array de objetos.
    const getThemAll = [...pokedexInfo, ...pokeInfo] // concateno todo! 

    return getThemAll 
    }
}

async function bringById (id) {
    if(id.length>10){  
        try {
            const searchingInDataBase = await Pokemon.findByPk(id, {include: Type})
            const mylittlePokemon = {
                id: searchingInDataBase.id,
                name: searchingInDataBase.name,
                types: searchingInDataBase.types.map(t => t.name),
                img: searchingInDataBase.img, 
                hp: searchingInDataBase.hp,
                attack: searchingInDataBase.attack,
                defense: searchingInDataBase.defense,
                speed: searchingInDataBase.speed,
                height: searchingInDataBase.height,
                weight: searchingInDataBase.weight,
            }

            return mylittlePokemon
            

        } catch (error) {
            next(error)
        }
    } else{ 
        try {  
            const pokemonById = await getApi(id)
            return pokemonById
        } catch (error) {
            next(error)
        }
    }

}

async function creatingPokemon (name, hp, attack, defense, speed, height, weight, img, isInDataBase, types ) {
     
  try{ 
    
    let existinPokemonDB = await Pokemon.findOne({
        where:{
            name : name.toLowerCase(),
        }
    });
    
    if(existinPokemonDB) return 'Pokemon alredy exist'

    let newPokemon = await Pokemon.create ({
        name, 
        hp, 
        attack,
        defense,
        speed,
        height,
        weight,
        img,
        isInDataBase,
    })

    const setingTypes = [...new Set(types)];
    setingTypes.map(async t => {
        const tDB = await Type.findAll({
            where: { name: t },
            
        },)
        newPokemon.addType(tDB);
    })
   
    return 'You did it! You create a whole new Pokemon!'
    }catch (error) {
        console.log(error)
    }
}


async function bringItByTypes () {
let pokemonTypeDB = await Type.findAll() // traigo toda la info de mi base de datos
    
if(pokemonTypeDB.length === 0){ // si es 0 que busque dentro de la api
    let pokemonTypeApi = await axios.get("https://pokeapi.co/api/v2/type")
    pokemonTypeApi = pokemonTypeApi.data.results.map( t => {return {name : t.name}})
    pokemonTypeDB = await Type.bulkCreate(pokemonTypeApi) // posteo con bulkcreate en mi tabla
}
    return pokemonTypeDB
}

module.exports = {bringItAll, bringById, creatingPokemon, bringItByTypes}