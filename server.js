require('dotenv/config')

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT || 8080
const app = express()

// Import routes
const notesRoutes = require('./app/routes/notes')
const authRoutes = require('./app/routes/auth')

// Middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use('/notes', notesRoutes)
app.use('/auth', authRoutes)

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