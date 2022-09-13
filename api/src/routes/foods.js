const express = require('express');
const router = express.Router();
const {food} = require('../db.js');
const {getAllRecipesDb} = require('./accions.js');

router.get('/', async (req, res) => {
    const comidas = await getAllRecipesDb();
    res.send(comidas);
});

module.exports = router;