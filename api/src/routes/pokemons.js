const express = require('express');
const { getAllPokemon } = require('./controllers');
const router = express.Router();

router.get('/', async (req,res) => {

    let pokemonPromise = await getAllPokemon()
    
    return res.status(200).json(pokemonPromise);
        
    
})
router.get('/:id/:dataBaseT', async (req,res) => {
    const {id, dataBaseT} = req.params

    if(!id) res.status(404).json({message: 'error fatal'})
    
})


module.exports = router