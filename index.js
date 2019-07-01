//express setup
var express = require('express');

//app setup
var app = express();
var server = app.listen(3000, function(){
    console.log('server: listening ☺');
})

app.use(express.static('public'));

//socket setup & pass server
var socket = require('socket.io');
var io = socket(server);

// io.on('connection', function(socket) {
//     console.log('socket: im connected ☺', socket.id);
// )}

//same thing but faster

io.on('connection', (socket) => {
    console.log('socket: im connected ☺', socket.id);

//handle chat event
    socket.on('chat', function(data) {
        io.sockets.emit('chat', data);
        
    })

})