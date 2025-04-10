import mongoose from 'mongoose'
import axios from 'axios'
import Country from '../models/Country.js';
import dotenv from 'dotenv'

if (process.env.NODE_ENV !== "production") {
    dotenv.config()
}

const MONGO_URI = process.env.MONGO_URI;

const response = await axios.get('https://restcountries.com/v3.1/all?fields=demonyms,idd');
const countries = response.data


mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to database')
    })
    .catch(e => {
        console.log(`Error connection to database: ${e.message}`)
    })

const seedDB = async () => {
    await Country.deleteMany()

    for (let c of countries) {
        const name = c.demonyms.eng.f
        const callingCode = c.idd.root + c.idd.suffixes

        if (c.idd.root === '' || c.idd.suffixes.length > 1) {
            continue
        }

        try {
            await Country.create({
                name,
                callingCode
            })
        } catch (e) {
            console.log(`Error saving country in database: ${e.message}`)
        }
    }
}

seedDB().then(() => {
    console.log('Database seeded')
    mongoose.connection.close().then(() => console.log("Database closed"));
})

