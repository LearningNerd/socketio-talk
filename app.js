// Dependencies
var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var cookie = require('cookie');
var cookieParser = require('cookie-parser');
//var browserSync = require('browser-sync');

var port = process.env.PORT || 8000;

// Use signed cookies
app.use(cookieParser('secretive secret cookie keyyyy'));

// "Secret" login route to grant slidemaster privileges with a cookie
app.get('/login', function (req, res) {
	res.cookie('yummycookie', 'this is a test', {maxAge: 10800000, httpOnly: true, signed: true});
	res.redirect('/');
});

// Logout to revoke slidemaster privileges
app.get('/logout', function(req,res){
	res.clearCookie('yummycookie');
	res.send('cleared');
});

// Serve static files
app.use(express.static('public'));


// SocketIO stuff:

var boxes = [];	// for square demo

io.on('connection', function(socket){
	console.log('\nA user connected!');

	// Parse and validate cookie
	var parsedCookies = cookie.parse(socket.handshake.headers.cookie || 'NONE!')
	var signedcookie = cookieParser.signedCookie(parsedCookies['yummycookie'], 'secretive secret cookie keyyyy');
	console.log('signed cookie value: ', signedcookie);

	// Only grant slidemaster privileges if client sent valid cookie
	// TODO: understand how this works -- I think I'm doing it wrong, lolz
	if (parsedCookies['yummycookie'] !== signedcookie) {

		// signal to client to set "slidechanged" listeners
		socket.emit('new master', socket.id);
		console.log('Slide master connected and confirmed. id: ' + socket.id);

		// Allow this client to broadcast to other clients
		socket.on("slidechanged", function (msg) {
			//console.log('Slide master changed slide! Now broadcasting to users.')
			socket.broadcast.emit("slidechanged", msg);
		});

		// codecast-test1
		socket.on("codecast1", function (msg) {
			//console.log('\n\nCODECAST:\n' + msg);
			socket.broadcast.emit("codecast1", msg);
		});
		socket.on("codecast2", function (msg) {
			//console.log('\n\nCODECAST:\n' + msg);
			socket.broadcast.emit("codecast2", msg);
		});

		socket.on('disconnect', function(){
			console.log('Slide master disconnected!');
		});

	} // end of section for slidemaster privileges

	socket.on('disconnect', function(){
		console.log('A user disconnected.');
	});


	// CHAT-DEMO
	socket.on('chat', function(data){
		//console.log('CHAT: name: '+ data.name + ', message: ' + data.message);
		io.emit('chat', data);
	});


	// SQUARE MOVE - SHARED
	socket.on('shared move', function(data){
		//console.log(data);
		socket.broadcast.emit('shared move', data);
	});

	// SQUARE MOVE - MASTER
	socket.on('master move', function(data){
		//console.log(data);
		socket.broadcast.emit('master move', data);
	});

	// SQUARE MOVE - INDIVIDUAL
	socket.on('new box', function(boxId){
		console.log('new box: ' + boxId);
		// Notify all other users (except the new user)
		socket.broadcast.emit('new box', boxId);
		// Store id and any other info about new box:
		boxes.push({id: boxId});
		console.log(boxes);
		// Send data of all previously connected users to the new user
		socket.emit('all previous boxes', boxes);
	});

	socket.on('individual move', function(data){
		//console.log(data);
		socket.broadcast.emit('individual move', data);
	});

	socket.on('disconnect', function(){
		var boxNotRemoved = removeTheBox( socket.id.substring(2) );
		if ( boxNotRemoved ) {
			console.log('this id was not assocaited with a box: ');
			console.log( socket.id.substring(2) );
		} else {
			console.log('USER DISCONNECTED, so removing boxes');

			// Alert all other users to remove box
			socket.broadcast.emit( 'remove box', socket.id.substring(2) );
		}
	});

	socket.on('remove box', function(boxId){
		removeTheBox(boxId);
		socket.broadcast.emit( 'remove box', boxId );
	});

	function removeTheBox(boxId) {
		// Remove from saved array of boxes
		var indexToRemove = boxes.map(function(box) { return box.id; }).indexOf( boxId );

		//console.log( boxes.map(function(box) { return box.id; }) );
		//console.log ( boxes.map(function(box) { return box.id; }).indexOf( boxId )  );

		if (indexToRemove === -1) return true;

		boxes.splice(indexToRemove, 1);

		console.log('REMOVVIIIING');
		console.log(boxId);

		console.log('NEW BOXES ARRAY');
		console.log(boxes);
	}


	// PAINT DEMO
	socket.on('new line', function(data){
		console.log(data);
		socket.broadcast.emit('new line', data);
	});


	// BROKEN PAINT DEMO
	socket.on('mousedown', function(data){
		//console.log(data);
		socket.broadcast.emit('mousedown', data);
	});
	socket.on('mousemove', function(data){
		//console.log(data);
		socket.broadcast.emit('mousemove', data);
	});


}); // end of io.on('connection' ...

// Server, listen up!
http.listen(port, function(){
	console.log('listening on ' + port);
  // browserSync({
  //   	proxy: 'localhost:' + port,
  //   	files: ['public/**/*.{js,css,html}']
  // });
});
