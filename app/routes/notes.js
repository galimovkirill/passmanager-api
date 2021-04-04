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
    console.log(req.body)
    const note = new Note({
        name: req.body.name,
        login: req.body.login,
        password: req.body.password,
        url: req.body.url,
        description: req.body.description,
        date: req.body.date
    })

    note.save()
        .then(data => {
            res.json(data)
        })
        .catch(e => {
            res.json({ message: e })
        })
})

router.delete('/:noteId', (req, res) => {
    Note.deleteOne({ _id: req.params.noteId })
        .then(data => {
            res.json(data)
        })
        .catch(e => {
            res.json({ message: e })
        })
})

module.exports = router