const express = require('express');
const router = express.Router();
const { Typing } = require('../controllers/controllers');

router.get('/', async (req,res) => {
    const bringType = await Typing()
    return res.status(200).send(bringType)
})



module.exports = router

