var express = require('express')
var router = express.Router()

var Database = require('nedb')
var db = new Database({filename: 'database'})

db.loadDatabase()

router.get('/', (req, res, next) => {
  res.status(501).send('Not Implemented')
})

router.post('/', (req, res, next) => {
  res.status(501).send('Not Implemented')
})

router.get('/:id', (req, res, next) => {
  res.status(501).send('Not Implemented')
})

router.put('/:id', (req, res, next) => {
  res.status(501).send('Not Implemented')
})

module.exports = router
