import express from "express";
const app = express();

app.get('/', (req, res) => {
    res.json({'msg':'welcoime home'})
})

app.listen(4000, () => {
    console.log('now listening to request from port 4000')
})