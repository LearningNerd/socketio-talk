var socket = io();

var box = document.getElementById('movebox');

function moveAndBroadcast(event) {
	// Arrow keys:
	// var UP = 38, DOWN = 40, LEFT = 37, RIGHT = 39;

	// WASD keys:
	var UP = 87, DOWN = 83, LEFT = 65, RIGHT = 68;

	// Normalize key code across browsers:
	var keyCode = event.which || event.keyCode || 0;

	if ( keyCode == UP || keyCode == DOWN || keyCode == LEFT || keyCode == RIGHT ) {
		moveTheBox(keyCode);
		socket.emit( 'master move', keyCode );
	}
}

socket.on('new master', function (msg) {
	console.log('New square moving master connected and confirmed.');
	window.addEventListener('keydown', moveAndBroadcast);
});

socket.on('master move', function(keyCode){
	moveTheBox(keyCode);
});

function moveTheBox(keyCode) {
	// Arrow keys:
	// var UP = 38, DOWN = 40, LEFT = 37, RIGHT = 39;

	// WASD keys:
	var UP = 87, DOWN = 83, LEFT = 65, RIGHT = 68;

	var delta = 20;
	var direction = 1;

	switch (keyCode) {
		case UP:
			direction = -1;
		case DOWN:
			box.style.top = ( parseInt(box.style.top, 10) + (direction * delta) ) + "px";
			break;
		case LEFT:
			direction = -1;
		case RIGHT:
			box.style.left = ( parseInt(box.style.left, 10) + (direction * delta) ) + "px";
			break;
	}
}
