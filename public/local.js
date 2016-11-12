// RevealJS options
Reveal.initialize({
	history: true
});

// Connect to SocketIO server
var socket = io();

// codecast-test1:
//var codecast1 = document.getElementById("codecast1");
//var codecast2 = document.getElementById("codecast2");


// BOX MOVING DEMO SLIDES, default for NON-master clients:
Reveal.addEventListener( 'boxmaster', function() {

	console.log('on slide: boxmaster');

	// Create the box
	var newBox = document.createElement('div');
	newBox.id = 'boxmaster';
	newBox.className = 'box me';
	newBox.style.top = '10%';
	newBox.style.left = '45%';
	document.body.appendChild(newBox);

	console.log('set socket listener');
	socket.on('master move', moveBoxOnSocketEvent);

	function moveBoxOnSocketEvent(keyCode) {
		console.log('ON master move:');
		moveTheBox(keyCode, "boxmaster");
	}

	// remove newly-created elements when leaving this slide:
	var thisSlide = Reveal.getState().indexh;
	console.log(thisSlide);
	Reveal.addEventListener('slidechanged', removeOnSlideChanged);

	function removeOnSlideChanged() {
		if (Reveal.getState().indexh !== thisSlide) {
			console.log('called REMOVE CHILD');
			document.body.removeChild(newBox);
			Reveal.removeEventListener('slidechanged', removeOnSlideChanged);
			socket.removeListener('master move', moveBoxOnSocketEvent);
			console.log('removed socket listener');
		}
	}

}, false );


// Set event listeners only if granted slidemaster privileges
socket.on('new master', function (msg) {
	console.log('New slidemaster connected and confirmed.');

	function emitSlideChange(event) {
		var state = Reveal.getState();
		socket.emit("slidechanged" , state);
		console.log('Emitting! This slidemaster changed the slide.');
	}

	Reveal.addEventListener('slidechanged', emitSlideChange);
	Reveal.addEventListener('fragmentshown', emitSlideChange);
	Reveal.addEventListener('fragmenthidden', emitSlideChange);

	// BOX MOVING DEMO SLIDES -- FOR BOX MASTER ONLY:
	Reveal.addEventListener( 'boxmaster', function() {

		console.log('on slide: boxmaster AND SET AS MASTER');

		console.log('ABOUT TO CALL REMOVE LISTENER, master');
		window.removeEventListener('keydown', moveAndBroadcast, false);
		console.log('* * * * * * * * *CALLED REMOVE LISTENER, master');
		window.addEventListener('keydown', moveAndBroadcast, false);

		function moveAndBroadcast(event) {
			console.log('called moveAndBroadcast from box master!');
			// Arrow keys:
			// var UP = 38, DOWN = 40, LEFT = 37, RIGHT = 39;

			// WASD keys:
			var UP = 87, DOWN = 83, LEFT = 65, RIGHT = 68;

			// Normalize key code across browsers:
			var keyCode = event.which || event.keyCode || 0;

			if ( keyCode == UP || keyCode == DOWN || keyCode == LEFT || keyCode == RIGHT ) {
				moveTheBox(keyCode, "boxmaster" );
				socket.emit( 'master move', keyCode );
			}
		}

		// remove event listener when leaving this slide:
		var thisSlide = Reveal.getState().indexh;
		console.log(thisSlide);
		Reveal.addEventListener('slidechanged', removeOnSlideChanged);
		function removeOnSlideChanged() {
			if (Reveal.getState().indexh !== thisSlide) {
				console.log('called REMOVE EVENT LISTENER for master function');
				window.removeEventListener('keydown', moveAndBroadcast, false);
				Reveal.removeEventListener('slidechanged', removeOnSlideChanged);
			}
		}

	}, false );

	// codecast-test1:
	function codeCast1() {
		console.log('\n\nCODECAST:\n' + codecast1.innerText);
		socket.emit('codecast1', codecast1.innerText);
	}
	function codeCast2() {
		console.log('\n\nCODECAST2:\n' + codecast2.innerText);
		socket.emit('codecast2', codecast2.innerText);
	}

	//codecast1.addEventListener("keyup", codeCast1);
	//codecast2.addEventListener("keyup", codeCast2);

}); //END code for slide master only

// If "slidechanged" event received from server, update view
socket.on('slidechanged', function (state) {
	console.log('Syncing! A slidemaster changed the slide.');
	Reveal.setState(state);
});



// BOX MOVING DEMOS
Reveal.addEventListener( 'boxshared', function() {

	console.log('on slide: boxshared');

	// Create the box
	var newBox = document.createElement('div');
    newBox.id = 'boxshared';
	newBox.className = 'box me';
	newBox.style.top = '10%';
	newBox.style.left = '45%';
	document.body.appendChild(newBox);

	window.addEventListener('keydown', moveAndBroadcast, false);

	socket.on('shared move', moveBoxOnSocketEvent);

	function moveBoxOnSocketEvent(keyCode) {
		moveTheBox(keyCode, "boxshared");
	}

	function moveAndBroadcast(event) {
		console.log('called boxShared moveAndBroadcast()!');
		// Arrow keys:
		// var UP = 38, DOWN = 40, LEFT = 37, RIGHT = 39;

		// WASD keys:
		var UP = 87, DOWN = 83, LEFT = 65, RIGHT = 68;

		// Normalize key code across browsers:
		var keyCode = event.which || event.keyCode || 0;

		if ( keyCode == UP || keyCode == DOWN || keyCode == LEFT || keyCode == RIGHT ) {
			moveTheBox(keyCode, "boxshared" );
			socket.emit( 'shared move', keyCode );
		}
	}

	// remove newly-created elements when leaving this slide:
	var thisSlide = Reveal.getState().indexh;
	console.log(thisSlide);
	Reveal.addEventListener('slidechanged', removeOnSlideChanged);
	function removeOnSlideChanged() {
		if (Reveal.getState().indexh !== thisSlide) {
			console.log('called REMOVE CHILD');
			document.body.removeChild(newBox);
			window.removeEventListener('keydown', moveAndBroadcast, false);
			socket.removeListener('shared move', moveBoxOnSocketEvent);
			console.log('removed event and socket listeners!');
			Reveal.removeEventListener('slidechanged', removeOnSlideChanged);
		}
	}

}, false ); // end of boxshared code

Reveal.addEventListener( 'boxindividual', function() {

	console.log('on slide: boxindividual');

	window.addEventListener('keydown', moveAndBroadcast, false);

	// Create the "me" box
	var newBox = document.createElement('div');
	// Link box to socketIO id
	newBox.id = socket.id;
	newBox.className = 'box me';
	newBox.style.top = '10%';
	newBox.style.left = '45%';
	document.body.appendChild(newBox);

	// Notify server of the new box
	console.log('* * * * * * EMITTING NEW BOX, id: ' + socket.id);
	socket.emit( 'new box', socket.id)

	socket.on('individual move', moveBoxOnSocketEvent);
	function moveBoxOnSocketEvent(data) {
		moveTheBox(data.key, data.id);
	}

	socket.on('all previous boxes', allPreviousBoxesSocketEvent);
	function allPreviousBoxesSocketEvent(boxes) {
		console.log('* ****** RECEIVED all previous boxes ');
		console.log(boxes);

		boxes.forEach(function(box){
			if (box.id !== socket.id) {
				createBox(box.id);
			}
		});
	}

	socket.on('new box', newBoxSocketEvent);
	function newBoxSocketEvent (boxId) {
		console.log('NEW BOX with id: ' + boxId);
		createBox(boxId);
	}

	socket.on('remove box', removeBoxSocketEvent);
	function removeBoxSocketEvent(boxId) {
		console.log('REMOVE BOX with id: ' + boxId);
		var box = document.getElementById(boxId);
		console.log('the box object to remove: ');
		console.log(box);
		document.body.removeChild(box);
	}

	// remove boxes and event listeners when leaving this slide:
	var thisSlide = Reveal.getState().indexh;
	console.log(thisSlide);
	Reveal.addEventListener('slidechanged', removeOnSlideChanged);
	function removeOnSlideChanged() {
		if (Reveal.getState().indexh !== thisSlide) {

			// Remove all of the boxes:
			var boxes = document.body.getElementsByClassName('box');
			for (var i = boxes.length-1; i >= 0; i--) {
				console.log(boxes[i].id);
				console.log(boxes[i].id !== 'boxshared');
				if (boxes[i].id !== 'boxshared' && boxes[i].id !== 'boxmaster') {
					console.log('removed box #' + boxes[i].id)
					document.body.removeChild(boxes[i]);
				}
		    }

			console.log('* * * * * * EMITTING REMOVE BOX, id: ' + socket.id);
			socket.emit( 'remove box', socket.id)

			console.log('called REMOVE EVENT LISTENERS for boxindividual');
			window.removeEventListener('keydown', moveAndBroadcast, false);

			socket.removeListener('individual move', moveBoxOnSocketEvent);
			socket.removeListener('all previous boxes', allPreviousBoxesSocketEvent);
			socket.removeListener('new box', newBoxSocketEvent);
			socket.removeListener('remove box', removeBoxSocketEvent);
			console.log('removed event and socket listeners!');

			Reveal.removeEventListener('slidechanged', removeOnSlideChanged);
		}
	}

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

	function createBox(boxId) {
		var newBox = document.createElement('div');
	    newBox.id = boxId;
		newBox.className = 'box';

		// Give the box a random color
		newBox.style.background = '#' + Math.floor(Math.random()*16777215).toString(16);

		// Give the box a random starting position somewhere in the viewport, not too close to being off an edge
		newBox.style.top = Math.floor(Math.random() * 91) + '%';
		newBox.style.left = Math.floor(Math.random() * 91) + '%';

		document.body.appendChild(newBox);
	}

}, false ); // end of boxindividual code


// BOX MOVING DEMOS:
function moveTheBox(keyCode, boxId) {
	// Arrow keys:
	// var UP = 38, DOWN = 40, LEFT = 37, RIGHT = 39;

	// WASD keys:
	var UP = 87, DOWN = 83, LEFT = 65, RIGHT = 68;

	// currently using percentages in css for these values:
	var SCREENWIDTH = 100, SCREENHEIGHT = 100, BOXSIZE = 10, STEPSIZE = 1.5, direction = 1, newPositionValue = 0;

	var box = document.getElementById(boxId);
	console.log('moving box with id: ' + boxId);
	console.log(keyCode);
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

// // codecast-test1:

// socket.on('codecast1', function(msg){
// 	console.log('\n\nCODECAST:\n' + msg);
// 	codecast1.innerText = msg;
// 	hljs.highlightBlock(codecast1);
// });
// socket.on('codecast2', function(msg){
// 	console.log('\n\nCODECAST2:\n' + msg);
// 	codecast2.innerText = msg;
// 	hljs.highlightBlock(codecast2);
// });
