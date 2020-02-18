const express = require('express')

const router = express.Router()

const db = require('../data/dbConfig');

router.post("/", (req, res) => {
    db('accounts')
    .insert(req.body, "id")
    .then( account => {
        res.status(201).json(account)
    })
    .catch(() => {
        res.status(500).json({ message: 'Could not add account'})
    })
});

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

router.put('/:id', (req, res) => {
    db('accounts')
      .where({ id: req.params.id })
      .update(req.body)
      .then(change => {
        if (change) {
          res.status(200).json({ message: `${change} account(s) updated` });
        } else {
          res.status(404).json({ message: 'Account not found' });
        }
      })
      .catch(() => {
        res.status(500).json({ message: 'Could not update the account' });
      });
  });
  
  router.delete('/:id', (req, res) => {
    db('accounts')
      .where({ id: req.params.id })
      .del()
      .then(count => {
        res.status(200).json({ message: `${count} record(s) deleted` });
      })
      .catch(() => {
        res.status(500).json({ message: 'Could not remove the account' });
      });
  });



module.exports = router