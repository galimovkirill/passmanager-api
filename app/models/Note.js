const mongoose = require('mongoose')
// name, login, password, description, date, url
const NoteSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxLength: 50,
        required: true
    },
    login: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        minlength: 1,
        trim: true,
        required: true
    },
    url: {
      type: String,
      trim: true
    },
    description: {
        type: String,
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Notes', NoteSchema)