const axios = require('axios');
const {Pokemon} = require('../db.js');
const Type = require('../models/Type');


const apiTypes =   axios.get('https://pokeapi.co/api/v2/type')


const getApiInfo = async () => {
    const apiPokemon =  await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=40')
    let newInfo = apiPokemon.data.results.map(el => axios.get(el.url))
    let pokeInfo = await axios.all(newInfo)
    let pokedex = pokeInfo.map(el=> {
     return {
            name: el.data.name,
            type: el.data.types.map((e) => e.type.name),
            img: el.data.sprites.other.dream_world.front_default,
            id: el.data.id
        }
    })

    return pokedex
}


const getDataBase = async() =>{
    try {
        return await Pokemon.findAll({
            include: {
                model: Type,
                atributes: ['name'], 
                thorugh: {
                  atributes: [], 
                },
              },
        })
        .then(p =>
            p.map(e=>{
                return{
                    id: e.id,
                    name: e.name,
                    picture: e.picture,
                    dataBaseT: e.dataBaseT,
                    types: e.types.map((t) => t.name),
                }
            }))
    } catch (error) {
        console.log(error);
    }
}
const getAllPokemon = async () => {
    const apiInfo  = await getApiInfo();
    const dbInfo = await getDataBase();
    const totalData = apiInfo.concat(dbInfo);
    return totalData;
}

module.exports ={
    getApiInfo,
    getDataBase,
    getAllPokemon
}