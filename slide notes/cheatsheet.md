# JAVASCRIPT / SOCKETIO CHEATSHEET


## Basic JavaScript

**Variables**

**Functions**

**Objects**

**...**

**Event Listeners**
document.addEventListener('click', myFunction);
function myFunction(event) {
	console.log(event);
}

document.addEventListener('click', function(event) {
	console.log(event);
});

## SocketIO

**Client**
io() ....
socket.on
socket.emit

**Server**
socket.on
socket.emit
socket.broadcast.emit
io.sockets.emit

**Built-in SocketIO events**
"connection"
"disconnect"
....?
