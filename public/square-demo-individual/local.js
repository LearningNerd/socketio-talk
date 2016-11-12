var socket = io();

var myBox = document.getElementById('me');

window.addEventListener('keydown', moveAndBroadcast);


socket.on('connect', function(){
	console.log(socket);
	myBox.id = socket.id;
	console.log('* * * * * * EMITTING NEW BOX, id: ' + socket.id);
	socket.emit( 'new box', socket.id)
});

socket.on('disconnect', function(){
	console.log('* * * * * * EMITTING REMOVE BOX, id: ' + socket.id);
	socket.emit( 'remove box', socket.id)
});

socket.on('all previous boxes', function(boxes) {
	console.log('* ****** RECEIVED all previous boxes ');
	console.log(boxes);

	boxes.forEach(function(box){
		if (box.id !== socket.id) {
			createBox(box.id);
		}
	});
});

socket.on('new box', function(boxId) {
	console.log('NEW BOX with id: ' + boxId);
	createBox(boxId);
});

socket.on('remove box', function(boxId) {
	console.log('REMOVE BOX with id: ' + boxId);
	var box = document.getElementById(boxId);
	document.body.removeChild(box);
});


function moveAndBroadcast(event) {
	// Arrow keys:
	// var UP = 38, DOWN = 40, LEFT = 37, RIGHT = 39;

	// WASD keys:
	var UP = 87, DOWN = 83, LEFT = 65, RIGHT = 68;

	// Normalize key code across browsers:
	var keyCode = event.which || event.keyCode || 0;

	if ( keyCode == UP || keyCode == DOWN || keyCode == LEFT || keyCode == RIGHT ) {
		moveTheBox(keyCode, socket.id);
		socket.emit( 'individual move', {key: keyCode, id: socket.id} );
	}
}

socket.on('individual move', function(data){
	moveTheBox(data.key, data.id);
});

function createBox(boxId) {
	var newBox = document.createElement('p');
    newBox.id = boxId;

	// Give the box a random color
	newBox.style.background = '#' + Math.floor(Math.random()*16777215).toString(16);

	// Give the box a random starting position somewhere in the viewport, not too close to being off an edge
	newBox.style.top = Math.floor(Math.random() * 91) + '%';
	newBox.style.left = Math.floor(Math.random() * 91) + '%';

	document.body.appendChild(newBox);
}

function moveTheBox(keyCode, boxId) {
	// Arrow keys:
	// var UP = 38, DOWN = 40, LEFT = 37, RIGHT = 39;

	// WASD keys:
	var UP = 87, DOWN = 83, LEFT = 65, RIGHT = 68;

	// currently using percentages in css for these values:
	var SCREENWIDTH = 100, SCREENHEIGHT = 100, BOXSIZE = 10, STEPSIZE = 1.5, direction = 1, newPositionValue = 0;

	var box = document.getElementById(boxId);
	console.log('moving box with id: ' + boxId);

	switch (keyCode) {
		case UP:
			direction = -1;
		case DOWN:
			newPositionValue = parseInt(box.style.top, 10) + (direction * STEPSIZE);
			if (newPositionValue >= SCREENHEIGHT) {
				box.style.top = (newPositionValue - SCREENHEIGHT) - BOXSIZE + '%';
			} else if (newPositionValue <= 0 - BOXSIZE) {
				box.style.top = newPositionValue + SCREENHEIGHT + BOXSIZE + '%';
			} else {
				box.style.top = newPositionValue + "%";
			}
			break;
		case LEFT:
			direction = -1;
		case RIGHT:
			newPositionValue = parseInt(box.style.left, 10) + (direction * STEPSIZE);
			if (newPositionValue >= SCREENWIDTH) {
				box.style.left = (newPositionValue - SCREENWIDTH) - BOXSIZE + '%';
			} else if (newPositionValue <= 0 - BOXSIZE) {
				box.style.left = newPositionValue + SCREENWIDTH + BOXSIZE + '%';
			} else {
				box.style.left = newPositionValue + "%";
			}
			break;
	}
}
