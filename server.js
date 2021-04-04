require('dotenv/config')

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 8080
const app = express()

// Import routes
const notesRoutes = require('./app/routes/notes')

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/notes', notesRoutes)

async function start() {
    try {
        await mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })

        app.listen(PORT, () => {
            console.log(`Server has been started on ${PORT} port!`)
        })
    }
    catch(err) {
        console.log(err)
    }
}

start()