import express from "express";
// import {connectToDb, getDb} from './db'
const {connectToDb, getDb} = require('./db')

console.log(connectToDb, getDb)

// creates the react app
const app = express();

document.querySelectorAll('.EsIlz').forEach(function(itm) {
    console.log({
        title: '',
        author: '',
        pages: Math.floor(Math.random() * 600) + 100,
        genres: ['comedy', 'fantasy', 'horror', 'romance', 'action', 'Sci-Fi'],
        reviews: [{}, {}]
    })
});


// opens connection to the database
let db
connectToDb((err: any) => {
    if (!err) {
        // now we can start listening for events
        app.listen(4000, () => {
            console.log('now listening to request from port 4000')
        })

        // updates our database variable
        db = getDb()
    } else {
        console.log(`we have an error, error: ${err}`)
    }
})

// connecting to the database

app.get('/', (req, res) => {
    res.json({'msg':'welcoime home'})
})

