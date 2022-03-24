const { Router } = require('express');
const {Pokemon} = require("../db.js")
const router = Router()

const { bringItAll, bringById, creatingPokemon } = require('../controllers/controllers');


router.get("/", async (req, res) =>{
    const {name} = req.query 
    const bringAllPokemon = await bringItAll(name)
    if(bringAllPokemon === '404') {
        return res.status(404).send('Pokemon does not exist')
    }
    return res.status(200).send(bringAllPokemon)
})

router.get('/:id', async(req, res) => {
    const {id} = req.params
    const bringPokeById = await bringById(id)
    return res.status(200).send(bringPokeById) 
})

router.post('/', async(req, res)=> {
   const {name, hp, attack, defense, speed, height, weight, img, isInDataBase, types} = req.body
    const postingPokemon = await creatingPokemon(name, hp, attack, defense, speed, height, weight, img, isInDataBase, types)
   return res.status(200).send(postingPokemon) 
})

router.delete('/', (req, res)=> {
    const {id} = req.body
    Pokemon.destroy({
        where: {id}
    })
    .then((post) => {

        res.status(200).json({code: 200, message: 'Post deleted', deletedPost: post})
    })
    .catch((error) => {
        res.status(500).json({code: 500, message:'Error', Error: error})
    })
})

module.exports = router