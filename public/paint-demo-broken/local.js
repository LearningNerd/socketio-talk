// make our websockets connection to the server using SocketIO
var socket = io();

// boilerplate for working with the canvas element:
var canvas = document.getElementById('mycanvas');
var pen = canvas.getContext('2d');

var isDrawing = false;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', drawStuff);
canvas.addEventListener('mouseup', stopDrawing);

function startDrawing(event) {
	console.log("Start: " + event.clientX + ", " + event.clientY);
	isDrawing = true;
	pen.beginPath();
	pen.moveTo(event.clientX, event.clientY );
	socket.emit('mousedown', {x: event.clientX, y: event.clientY});
}

function drawStuff(event) {
	console.log("Move: " + event.clientX + ", " + event.clientY);
	pen.lineTo(event.clientX, event.clientY);
	if (isDrawing) {
		pen.stroke();
		socket.emit('mousemove', {x: event.clientX, y: event.clientY, buttons: event.buttons});
	}
}

function stopDrawing(event) {
	console.log("Stop: " + event.clientX + ", " + event.clientY);
	isDrawing = false;
}

// function stopDrawing(event) {
// 	console.log("Stop: " + event.clientX + ", " + event.clientY);
//	pen.stroke();
// }

socket.on('mousedown', function(data){
	console.log(data);
	pen.beginPath();
	pen.moveTo(data.x, data.y);
});

socket.on('mousemove', function(data){
	console.log(data);
	pen.lineTo(data.x, data.y);
	pen.stroke();
});
