import express from "express";

// import {connectToDb, getDb} from './db'
const {ObjectId} = require('mongodb');
const {connectToDb, getDb} = require('./db')


// creates the react app
const app = express();

// opens connection to the database
let db: any
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


// request to the home page
app.get('/', (req, res) => {
    res.json({'msg':'welcome to the home page'})
})

// request for all books
app.get('/books', (req, res) => {
    let books: {}[] = []

    db.collection('books').find().limit(20).sort({author: 1})
    .forEach((book: {}) => {
        books.push(book)
    })
    .then(() => {
        res.status(200).json({'msg':'okay', 'totalBooks':books.length, books})
    })
    .catch((err: any )=> {
        res.status(500).json({'msg':'bad', 'cause': err})
    })
})

// request for just one book
app.get('/books/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('books').findOne({_id: ObjectId(req.params.id)})
        .then((doc: {}) => {
            res.status(200).json({'msg':'okay', 'book':doc})
        })
        .catch((err: any )=> {
            res.status(500).json({'msg':'bad', 'cause': err})
        })
    } else {
        res.status(500).json({'msg':'bad', 'cause': 'Invalid id received'})
    }
})

// making a post request
app.post('/books', (req, res) => {
    const book = req.body

    db.collection('books').insertOne(book)
    .then((result: {}) => {
        res.status(201).json({'msg':'okay', 'book':result})
    })
    .catch((err: any )=> {
        res.status(500).json({'msg':'bad', 'cause': `could not create a new document, error: ${err}`})
    })
})


// making a delete request
app.post('/books/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('books').deleteOne({_id: ObjectId(req.params.id)})
        .then((result: {}) => {
            res.status(200).json({'msg':'okay', 'book':result})
        })
        .catch((err: any )=> {
            res.status(500).json({'msg':'bad', 'cause': err})
        })
    } else {
        res.status(500).json({'msg':'bad', 'cause': 'Invalid id received'})
    }
})