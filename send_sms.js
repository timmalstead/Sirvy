const dotenv = require('dotenv');
dotenv.config();

const client = require('twilio')(process.env.TWILIO_SID,process.env.TWILIO_TOKEN)

// client.messages.create({
//     body : 'MESSAGE TO SEND',
//     from : 'SENDING NUMBER',
//     to : 'RECIEVING NUMBER'
// })

export default client