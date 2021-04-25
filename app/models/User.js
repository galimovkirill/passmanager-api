const { Schema, model } = require('mongoose')

const User = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, unique: true, index: true, required: true },
    password: { type: String, required: true },
    roles: { type: Array, ref: 'Role' }
})

module.exports = model('User', User)