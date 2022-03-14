const express = require('express');
const router = express.Router();
const { bringItByTypes } = require('../controllers/controllers');

router.get('/', async (req,res) => {
    const bringType = await bringItByTypes()
    return res.status(200).send(bringType)
})

module.exports = router

