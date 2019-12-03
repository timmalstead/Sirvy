const dotenv = require('dotenv');
dotenv.config();

const client = require('twilio')(process.env.TWILIO_SID,process.env.TWILIO_TOKEN)

client.messages.create({
    body : 'Tim, I think you found those local variables',
    from : '+12132141135',
    to : '+17604683754'
})