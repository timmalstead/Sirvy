const express = require ('express')
const dotenv = require('dotenv');
dotenv.config();
const client = require('twilio')(process.env.TWILIO_SID,process.env.TWILIO_TOKEN)

const app = express()

app.use(express.urlencoded({extended:false}))
app.use(express.json())

const PORT = process.env.PORT

app.get('/test', (req,res) => {
    res.json({name : "Tim", friendly : "sometimes"})
})

app.post('/send', (req,res) => {
    console.log("hitting")
    client.messages.create({
        body : req.body.body,
        from : process.env.TWILIO_FROM_NUMBER,
        to : req.body.to
    })
})

app.post('/sms', (req,res) => {
    console.log(req.body)
})

app.listen(PORT, () => {
    console.log(`Running on ${PORT}`)
})