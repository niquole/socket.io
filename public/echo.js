var socket = io.connect('http://localhost:3000');


//query DOM 
var message = document.getElementById('message');
var btn = document.getElementById('send');
var output = document.getElementById('output');

//emit events

btn.addEventListener('click',function() {
    socket.emit('chat', {
        message: message.value
    })
})


socket.on('chat', function(data) {
    output.innerHTML +='<p>' + data.message + '</p>';
})