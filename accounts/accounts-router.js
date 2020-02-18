const express = require('express')

const router = express.Router()

const db = require('../data/dbConfig');

router.get('/', (req, res) => {
    db('accounts')
    .then( accounts => {
        res.status(200).json(accounts)
    })
    .catch( () => {
        res.status(500).json({ message: 'Could not find accounts' })
    })
}) 

router.get('/:id', (req, res) => {
    db('accounts')
    .where({ id: req.params.id })
    .first()
    .then( account => {
        if (account) {
            res.status(200).json(account)
        } else {
            res.status(404).json({ message: 'ID not found'})
        }
    })
    .catch( () => {
        res.status(500).json({ message: 'Could not get ID'})
    })
})





module.exports = router