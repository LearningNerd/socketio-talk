// make our websockets connection to the server using SocketIO
var socket = io();

// boilerplate for working with the canvas element:
var canvas = document.getElementById('mycanvas');
var pen = canvas.getContext('2d');

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', drawStuff);
canvas.addEventListener('mouseup', stopDrawing);

var isDrawing = false;
var lastSent;
var prevX;
var prevY;


function startDrawing(event) {
	console.log("Start: " + event.clientX + ", " + event.clientY);
	isDrawing = true;
	lastSent = Date.now();
	prevX = event.clientX;
	prevY = event.clientY;
}

function drawStuff(event) {
	if (isDrawing && Date.now() - lastSent > 30) {
		pen.beginPath();
		pen.moveTo(prevX, prevY);
		pen.lineTo(event.clientX, event.clientY);
		pen.stroke();

		console.log("From: " + prevX + ", " + prevY + " To: " + event.clientX + ", " + event.clientY);

		lastSent = Date.now();

		socket.emit('new line', {fromX: prevX, fromY: prevY, toX: event.clientX, toY: event.clientY});

		prevX = event.clientX;
		prevY = event.clientY;
	}
}

function stopDrawing(event) {
	isDrawing = false;
	console.log("Stop: " + event.clientX + ", " + event.clientY);
}

socket.on('new line', function(data){
	console.log(data);
	pen.beginPath();
	pen.moveTo(data.fromX, data.fromY);
	pen.lineTo(data.toX, data.toY);
	pen.stroke();
});
