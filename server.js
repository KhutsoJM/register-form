// PACKAGES
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'


dotenv.config()
const app = express()


// ENV
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;


// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// ROUTERS
import userRoutes from './routes/users.js';


// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));

// set ejs as the templating engine
app.set('view engine', 'ejs')
// set the views directory
app.set('views', path.join(__dirname, 'views'))
// serve static files (CSS, images, etc)
app.use(express.static(path.join(__dirname, 'public')));


// ROUTES
app.use('/register', userRoutes)









app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`)
    mongoose.connect(MONGO_URI)
        .then(() => {
            console.log('Connected to Database')
        })
        .catch((e) => {
            console.log(`Error connecting to the database: ${e.message}`)
        })
})

