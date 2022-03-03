const express = require('express');
const router = express.Router();
const axios = require('axios')
const {Type} = require("../db")

router.get('/', async (req,res) => {
    let pokemonTypeDB = await Type.findAll() // traigo toda la info de mi base de datos
    
    if(pokemonTypeDB.length === 0){ // si es 0 que busque dentro de la api
        let pokemonTypeApi = await axios.get("https://pokeapi.co/api/v2/type")
        pokemonTypeApi = pokemonTypeApi.data.results.map( t => {return {name : t.name}})
        pokemonTypeDB = await Type.bulkCreate(pokemonTypeApi) // posteo con bulkcreate en mi tabla
    }
        res.status(200).json(pokemonTypeDB) // respondo con todo en la base de datos.
})



module.exports = router

