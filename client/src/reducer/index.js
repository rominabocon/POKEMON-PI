import { CATCH_ALL_POKEMON, CATCH_POKEMON_BY_ID, CATCH_POKEMON_BY_NAME, CATCH_POKEMON_BY_ORIGIN, CATCH_POKEMON_BY_TYPE, DELETE_DETAIL, GET_ALL_TYPES, SORT_POKEMON, SORT_POKEMON_BY_ATTACK } from "../actions";

const initialState = {
    pokemons: [],
    types: [],
    bringAllPokemons: [],
    detail: [],
}

function rootReducer(state=initialState, action) {
    switch(action.type){
        case CATCH_ALL_POKEMON :
            return{
                ...state,
                pokemons: action.payload,
                bringAllPokemons: action.payload,
            };
        case GET_ALL_TYPES :
            return{
                ...state,
                types: action.payload
            };
        case CATCH_POKEMON_BY_NAME:
            return{
                ...state,
                pokemons: [action.payload]
            };
        case SORT_POKEMON:
            let sortingPokemons = action.payload === 'sortAZ' ?
            state.pokemons.sort(function(a, b) {
                if (a.name > b.name) {
                    return 1
                }
                if(b.name > a.name) {
                    return -1
                }
                return 0
            }) :
            state.pokemons.sort(function (a,b) {
                if (a.name < b.name) {
                    return 1
                }
                if(b.name < a.name) {
                    return -1
                }
                return 0
            })
            return{
                ...state,
                pokemons: sortingPokemons
            };
        case CATCH_POKEMON_BY_TYPE: 
            const bringpokemons = state.bringAllPokemons
            let seachingPokebyType = action.payload === 'all'? bringpokemons : bringpokemons.filter(p => {
                if(typeof p.types[0] !== 'string') {
                    p.types = p.types.map(tp => tp.name)
                }
                return p.types.includes(action.payload)
            })
            return {
                ...state,
                pokemons: seachingPokebyType
            };
        case CATCH_POKEMON_BY_ORIGIN:
            const bringOrigin = state.bringAllPokemons

            const sortingOrigin = action.payload === "all" ? bringOrigin : action.payload === "created" ?  bringOrigin.filter(p => p.isInDataBase) : bringOrigin.filter(p => !p.isInDataBase)

            return{
                ...state,
                pokemons: action.payload === "all" ? bringOrigin : sortingOrigin
            };
        case CATCH_POKEMON_BY_ID: 
            return { 
                ...state,
                detail: action.payload
            };
        case SORT_POKEMON_BY_ATTACK:
            let sortingAttack = action.payload === 'sortLower' ?
            state.pokemons.sort(function(a, b) {
                if (a.attack > b.attack) {
                    return 1
                }
                if(b.attack > a.attack) {
                    return -1
                }
                return 0
            }) :
            state.pokemons.sort(function (a,b) {
                if (a.attack < b.attack) {
                    return 1
                }
                if(b.attack < a.attack) {
                    return -1
                }
                return 0
            })
            return{
                ...state,
                pokemons: sortingAttack
            };
        case DELETE_DETAIL:
            return{
                ...state,
                detail: []
            };
        default:
                return state
    }
}

export default rootReducer