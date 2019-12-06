const express = require ('express')
const dotenv = require('dotenv');
dotenv.config();
const client = require('twilio')(process.env.TWILIO_SID,process.env.TWILIO_TOKEN)
const http = require('http')
const io = require('./io')

const app = express()
const server = http.Server(app)
io.attach(server)

app.use(express.urlencoded({extended:false}))
app.use(express.json())

const PORT = process.env.PORT

const textCache = []

// app.get('/recieve', (req,res) => {
//     res.json(textCache)
// })

app.post('/send', (req,res) => {
    client.messages.create({
        body : req.body.body,
        from : process.env.TWILIO_FROM_NUMBER,
        to : req.body.to
    })
    console.log(req.body.to)
})

app.post('/sms', (req,res) => {
    console.log(req.body.Body)
    const returnedText = {returningNumber : req.body.From, returningText : req.body.Body}
    textCache.push(returnedText)
    io.emit('sms', {data: textCache})
})

server.listen(PORT, () => {
    console.log(`Running on ${PORT}`)
})