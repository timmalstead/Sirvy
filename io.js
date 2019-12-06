const io = require('socket.io')()

io.on('connect', function(socket){
    console.log('connecting to socket')
})

module.exports = io