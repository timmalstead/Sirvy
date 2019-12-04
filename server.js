const express = require ('express')
const dotenv = require('dotenv');
dotenv.config();

const app = express()

const PORT = process.env.PORT

app.get('/test', (req,res) => {
    res.json({name : "Tim", friendly : "sometimes"})
})

app.listen(PORT, () => {
    console.log(`Running on ${PORT}`)
})