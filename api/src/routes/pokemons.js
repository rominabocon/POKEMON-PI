const { Router } = require('express');

const router = Router()

const { bringItAll, bringById, creatingPokemon } = require('../controllers/controllers');


router.get("/", async (req, res) =>{
    const {name} = req.query // llamo por query al dato que busco
    const bringAllPokemon = await bringItAll(name)
    return res.status(200).send(bringAllPokemon)
    
})

router.get('/:id', async(req, res, next) => {
    const {id} = req.params
    const bringPokeById = await bringById(id)
    return res.status(200).send(bringPokeById) 
})

router.post('/', async(req, res)=> {
   const {name, hp, attack, defense, speed, height, weight, img, isInDataBase, types} = req.body
    const postingPokemon = await creatingPokemon(name, hp, attack, defense, speed, height, weight, img, isInDataBase, types)
   return res.status(200).send(postingPokemon) 
})

module.exports = router