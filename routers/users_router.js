const express = require('express');
const knex = require('knex');
const dbConfig = require('../knexfile');


const router = express.Router();
const db = knex(dbConfig.development);

router.use(express.json());

router.get('/', (req, res) => {
    db('users')
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        res.status(500).json({ message: 'error getting users'})
    })
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    db('users').where('id', id)
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        res.status(500).json({error: 'error getting user by ID'})
    })
});

router.get('/finduser/:user', (req, res) => {
    const {user} = req.params;
    const newUser = req.body;
    db('users').where('user', user)
    .then(user => {
        if(user) {
            res.json(user)
        } else {
            router.post('/', (req, res) => {
                if(newUser.user) {
                    db('users').insert(newUser)
                    .then(id => {
                        res.status(201).json(id);
                    })
                    .catch(err => {
                        res.status(500).json({ error: 'error creating new user'})
                    })
                }
            })
        }
    })
    .catch(err => {
        res.status(500).json({ error: 'error finding user' })
    })
})

router.post('/', (req, res) => {
    const newUser = req.body;
    if(newUser.user) {
        db('users').insert(newUser)
        .then(ids => {
            res.status(201).json(ids)
        })
        .catch(err => {
            res.status(500).json({error: 'error creating new user'})
        })
    } else {
        res.status(400).json({error: 'Missing user name'})
    }
});

module.exports = router