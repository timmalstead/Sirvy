const express = require ('express')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config();
const client = require('twilio')(process.env.TWILIO_SID,process.env.TWILIO_TOKEN)
const http = require('http')
const io = require('socket.io')()

const app = express()
app.use(express.static(path.join(__dirname, 'build')))
const server = http.Server(app)
io.attach(server)

app.use(express.urlencoded({extended:false}))
app.use(express.json())

const PORT = process.env.PORT

io.on('connect', () => console.log('connected to socket'))

const textCache = []

app.post('/send', (req,res) => {
    console.log(req.body)
    textCache.length = 0
    req.body.to.forEach( (sendNumber,i) => {
            const messageWithUser = req.body.body.replace('MESSAGE RECIPIENT', req.body.names[i])
            client.messages.create({
                body : messageWithUser,
                from : process.env.TWILIO_FROM_NUMBER,
                to : sendNumber
            })
        }
    )
    res.json({message : 'sent'})
})

app.post('/sms', (req,res) => {
    let returnedBody = undefined
    if (req.body.Body.startsWith('a') || req.body.Body.startsWith('A')) {
        returnedBody = 'a'
    } else (returnedBody = 'b')
    const returnedText = {returningNumber : req.body.From, returningText : returnedBody}
    textCache.push(returnedText)
    io.emit('sms', {data: textCache})
})

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

server.listen(PORT, () => console.log(`Running on ${PORT}`))