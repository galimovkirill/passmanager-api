const express = require('express')
const router = express.Router()
const Note = require('../models/Note')

router.get('/', (req, res) => {
    Note.find()
        .then(notes => {
            res.json(notes)
        })
        .catch(err => {
            res.json({ message: err })
        })
})

router.post('/', (req, res) => {
    const note = new Note({
        title: req.body.title,
        description: req.body.description
    })

    note.save()
        .then(data => {
            res.json(data)
        })
        .catch(e => {
            res.json({ message: e })
        })
})

module.exports = router