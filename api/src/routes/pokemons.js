const { Router } = require('express');

const router = Router()

const { BringItAllP, BringByType, postingPokemon } = require('../controllers/controllers');




router.get("/", async (req, res) =>{
    
    const {name} = req.query // llamo por query al dato que busco
    const prueba = await BringItAllP(name)
    return res.status(200).send(prueba)
    
})

router.get('/:id', async(req, res, next) => {
    const {id} = req.params
    const pruebaUno = await BringByType(id)
    return res.status(200).send(pruebaUno) 
})

router.post('/', async(req, res)=> {
   const {name, hp, attack, defense, speed, height, weight, img, isInDataBase, types} = req.body
    const lookingP = await postingPokemon(name, hp, attack, defense, speed, height, weight, img, isInDataBase, types)
   return res.status(200).send(lookingP) 
})

module.exports = router