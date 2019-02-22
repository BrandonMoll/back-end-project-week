const express = require('express');
const knex = require('knex');
const dbConfig = require('../knexfile');
const cors = require('cors');


const router = express.Router();
const db = knex(dbConfig.development);

router.use(express.json());
router.use(cors('*'))

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
    //find user in db by username

    db('users').where('user', user)
    .then(dbUser => {

        //if it exists, send back the user

        if(dbUser.user) {
            console.log('found user')
            res.json(dbUser)
        } else {

            //if not, create a new user

            router.post('/', (req, res) => {
                    db('users').insert(user)
                    .then(id => {
                        console.log('inside post response')
                        //then get that user by the id and send it back

                        router.get('/', (req, res) => {
                            db('users').where('id', id)
                            .then(rows => {
                                console.log('found new user')
                                res.json(rows)
                            })
                            .catch(err => {
                                res.status(500).json({ error: 'error getting new user' })
                            })
                        })
                    })
                    .catch(err => {
                        res.status(500).json({ error: 'error creating new user'})
                    })
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