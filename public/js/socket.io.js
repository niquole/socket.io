var socket;

var usernameColor = "black";

var output =  document.getElementById('output');


var username = prompt('whats ur name');
var message = document.getElementById('message');


if (username && username !== '') {
    var socket = io.connect('http://localhost:3000');
    socket.emit('userJoined', username);
    message.focus;

    socket.on('newUser', function(data){
        output.innerHTML += '<p class="newUserMessage">' + data + ' has joined the chat </p>';
    })
    
    function keyboardSend(event) {
        if(event.key == "Enter") {
            if(message.value.indexOf('/') === 0) {
                var spaceIndex = message.value.indexOf(' ');
                if(spaceIndex !== -1) {
                    var command = message.value.substring(1, spaceIndex);
                    var parameter = message.value.substring(spaceIndex + 1, message.value.length);
                    if(command === 'color') {
                        usernameColor = parameter;
                    }
                    message.value = '';
                    message.focus;
                }
            } else {
                sendMessage();       
            }
        }
    }
    
    function sendMessage() {
        socket.emit('globalMessage', {
            user: username,
            msg: message.value,
            color: usernameColor
        });
        message.value = '';
        message.focus;
        
    }
    
    socket.on('userText', function(data){
        output.innerHTML += '<p class="message"><strong style="color:' + data.color + '">' + data.user + '</strong>: ' + data.msg + '</p>';
    })
} else {
    output.innerHTML = '<p class="error"> Please refresh and enter a username.</p>';  
}
