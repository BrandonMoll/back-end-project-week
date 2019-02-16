require('dotenv').config()
const express = require('express');
const knex = require('knex');
const dbEngine = process.env.DB || 'development';
const config = require('../knexfile.js')[dbEngine]



const router = express.Router();
const db = knex(config);

router.use(express.json());

router.get('/', (req, res) => {
    db('notes')
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        res.status(500).json({error: 'error getting notes'})
    })
});

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


router.post('/', (req, res) => {
    const newNote = req.body;
    if(newNote.title && newNote.content) {
        db('notes').insert(newNote)
        .then(ids => {
            res.status(201).json(ids)
        })
        .catch(err => {
            res.status(500).json({error: 'error creating new note'})
        })
    } else {
        res.status(400).json({error: 'Missing title or content'})
    }
});

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const updatedNote = req.body;

    if(updatedNote.title && updatedNote.content) {
        db('notes').where('id', id).update(updatedNote)
        .then(rows => {
            res.status(201).json(rows);
        })
        .catch(err => {
            res.status(500).json({error: 'error updating note'})
        })
    } else {
        res.status(400).json({error: 'missing title or content'})
    }
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;

    db('notes').where('id', id).del()
    .then(rowCount => {
        res.status(201).json(rowCount)
    })
    .catch(err => {
        res.status(500).json({error: 'error deleting that note'})
    })
});

module.exports = router