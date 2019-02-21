const express = require('express');
const knex = require('knex');
const dbConfig = require('../knexfile');


const router = express.Router();
const db = knex(dbConfig.development);

router.use(express.json());

router.get('/users/:name', (req, res) => {
    const {name} = req.params;
    
})

router.get('/:id', (req, res) => {
    const {id} = req.params;
    db('notes').where('id', id)
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        res.status(500).json({error: 'error getting note by ID'})
    })
});

module.exports = router