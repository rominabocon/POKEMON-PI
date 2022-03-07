import axios from "axios";

export const CATCH_ALL_POKEMON = 'catchAllPokemon'; //ok
export const GET_ALL_TYPES = 'getAllTypes'; //ok
export const CATCH_POKEMON_BY_ID = 'catchPokemonById'//ok
export const SORT_POKEMON_BY_ATTACK = 'sortPokemonByAttack'
export const CATCH_POKEMON_BY_NAME = 'catchPokemonByName'; //ok
export const CATCH_POKEMON_BY_TYPE = 'catchPokemonByType'; //ok
export const CATCH_POKEMON_BY_ORIGIN = 'catchPokemonByOrigin' //ok
export const SORT_POKEMON = 'sortPokemons'; //ok

export const catchAllPokemon = () => async dispatch => {
    const pokemons = await axios.get('http://localhost:3001/pokemons')
    return dispatch({
        type: CATCH_ALL_POKEMON,
        payload: pokemons.data
    })
}

export const getAllTypes = () => async dispatch =>{
    const poketypes = await axios.get('http://localhost:3001/types')
    return dispatch({
        type: GET_ALL_TYPES,
        payload: poketypes.data
    })
}

export const catchPokemonByName = (name) => {
    return async function(dispatch){
        try {
            let pokeName = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
            return dispatch({
            type: CATCH_POKEMON_BY_NAME,
            payload: pokeName.data
        })
        } catch (error) {
            console.log(error)
        }
    }
}

export const catchPokemonByType = (payload) => {
    return {
        type: CATCH_POKEMON_BY_TYPE,
        payload
    }
}

export const sortPokemon = (payload) => {
    return{
        type: SORT_POKEMON,
        payload
    }
}

export const catchPokemonByOrigin = (payload) => {
    return{
        type: CATCH_POKEMON_BY_ORIGIN,
        payload
    }
}

export const pokemonDetail = (id)=> {
    return async function(dispatch){
        try {
            let pokedetail = await axios.get(`http://localhost:3001/pokemons/${id}`)
            return dispatch({
            type: CATCH_POKEMON_BY_ID,
            payload: pokedetail.data
        })
        } catch (error) {
            console.log(error)
        }
    }
}

export const sortPokemonbyAttack = (payload) => {
    return {
        type: SORT_POKEMON_BY_ATTACK,
        payload
    }
}

export function createPokemon(payload){
    return async function(dispatch){
        const pokeCreate = await axios.post("http://localhost:3001/pokemons", payload)
        return pokeCreate
    }
}