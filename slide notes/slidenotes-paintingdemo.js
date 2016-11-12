# NOTES -- PAINTING DEMO CODE

# START WITH FUN WEB SOCKETS DEMO:

https://chrome.com/supersyncsports/
	https://www.youtube.com/watch?v=aSmqq9RbiaU

RACER, good video, mentions WebSocket :
	https://www.youtube.com/watch?v=17P67Uz0kcw


MORE COOL PAINTING APP IDEAS TO EXTEND OURS:

 with music: http://www.manxue-wang.com/
 with AI: https://www.chromeexperiments.com/experiment/alice
 with libraries like http://paperjs.org/



## ORDER OF SLIDE CONTENT
1) Install/setup as soon as people arrive, or beforehand via email instructions!
******FIRST SOMETHING HANDS ON !!!
2) Overview of web sockets, servers, our apps logic
3) JS refresher - like 5 min, rely mostly on cheat sheet provided to everyone
4) ConsoleLOG using SocketIO to send/receive messages
5) Super quick canvas tutorial
6) Build out the app
7) IF TIME: build features, people vote on which?
8) IF TIME: push to GitHub and Heroku!

## MEDIA / ASSETS LIST

### CODE
- Finished code fr painting app inside a slide, looking nice!
- Collaborative drawing game by writing canvas code into a box
- A mini timer app inside the slides that only I can start/stop ??
- Group voting app, so people can vote on what feature to build next?

### DIAGRAMS
- Client / server / HTTP basics diagram ?
- Web Sockets diagram - telegraph vs telephone
	- client and server listening and talking at the same time
	- mapping the listening and talking to SocketIO commands
- Diagram showing the steps that happen in our app
- Diagram or GIF showing how canvas works:
	- coordinate system
	- the four steps to draw a line
- GIF showing browser console?
- The three parts to addEventListener
- GIF showing our final working app, to put in static slides
- GIF showing console.log in browser and in command line
- GIF showing running a node.js app, opening it in the browser ?
- A slide on 1) NodeJs, 2) Express, 3) WebSockets, 4) SocketIO ??

### ORGANIZATIONAL CONTENT stuff
- Outline f content shared on the meetup page and sent out to everyone who RSVPed!!
- A way to get peoples emails...
- Interest form for the waitlist people to notify them for next time
- New sample code repo on GitHub, paintdemo -- branches, different versions, starter code and finished code
- Static version of slides to bookmark
- Extra resources list, ideally on our meetup website!
- A separate JavaScript quick sheet, either printed out or separate link (on meetup website!)
	- variables, functions, if/else, some common JS functions, objects and object literal notation, SocketIO, etc...
- A separate command line cheat sheet
- NodeJS and NPM cheat sheet ?

## PRE WORKSHOP PLAN
- PRINTED on paper:
	- WiFi info
	- link to slides
- INSTALLATION INSTRUCTIONS TO START RIGHT AWAY
	- OPTIONS: a) email it to people beforehand?, 1) print it out, 2) keep as slides, 3) separate slides, 4) IDEAL: general tutorial article and/or video on LTCLA website!
	- ****** INSTALL NODEMON AT BEGINNING TOO ******


- first 30 min: installation, walk around and meet people, play browserquest etc

/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */

// IDEA list:
 	// extend with libraries like http://fabricjs.com/

// XXX: EXTRA LINKS:
	// good canvas tutorial: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial

## INTRO TO JS??

*** NOTES FROM 9/5:
- update instructions to work for people who use git clone also!!!
- remember to close and reopn console after installing NodeJS
- windows may have to edit the path, add environment variables

/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */
/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */

- 7pm: INFO / WELCOME MESSAGES
	- Introduce myself, my name, the meetup group
	- Mention our weekly meetup
	- Tip jar, say what $ we need to raise
	- Join us, food/drinks tonight across the street!
	- Show Slack / link
	- 2 Bathrooms upstairs
	- Big thanks to Opodz
	- Free day pass, tell them we sent you!
	- afterwards, help me put chairs and paintings away
	- my spiel on goals of the class:
		- if you feel a little confused or frustrated, thats GOOD, means youre learning!
		- interrupt me w questions anytime, no such thing as a dumb question
			- but in the interest of saving time I might not answer it til the end
		- hopefully will inspire many new questions, and we can answer a few of them!
		- practice every day and share links w us on slack on what youre up to!


## STARTER

boilerplate code for web and websocket server, html and css

## SENDING MESSAGES BACK AND FORTH

// send information!!		socket.emit('event name here', data);
// receive information!!	socket.on('event name here', myCoolFunction);
// NOTE that myCoolFunction receives a special parameter/variable that contains the data we send in socket.emit


// NOTE that now you have TWO consoles to worry about: the web browser for client-side, and command line for server-side

// XXX in app.js, change to look like:
io.on('connection', function(socket){
	console.log('A user connected!');

	io.sockets.emit('test', "Hi there! I'll be your server this evening. I recommend the lobster bisque.");

	socket.on('test', function(data){
		console.log(data);
	});
});
// NOTE that the server-side code goes inside the connection event, which is what gives us access to the socket object!

// XXX in local.js:
socket.emit('test', "Hi, server! Do you have any chocolate cake?");

socket.on('test', function(data){
	console.log(data);
});


// XXX Test this out with a couple of tabs open!
// XXX Be sure to check the console in the browser and in command line!




// XXX Now let's have the server reply to just one client:
// in app.js:
io.on('connection', function(socket){
	console.log('A user connected!');

	io.emit('test', "Hi there! I'll be your server this evening. I recommend the lobster bisque.");

	socket.on('test', function(data){
		console.log(data);

		socket.emit('test', "Nope, no chocolate cake here. I ate it all, sorry!");
	});
});

// XXX And finally, have the server send a message to every client EXCEPT the client that just connected:
*** inside io.on('connection' ... ****:
socket.broadcast.emit('test', "Don't tell the new guy I said this, but he's really bad at JavaScript so watch out!");


## CANVAS INTRO

// Make a variable pointing to the canvas
var canvas = document.getElementById('mycanvas');
// Get access to its built-in 2d drawing function:
var pen = canvas.getContext('2d');

// Now let's draw something!

// XXX: Drawing a line on canvas generally has 4 steps:
	// 1. beginPath to initialize the whole things
	// 2. moveTo puts our virutal pen at certain coordinates, the starting position
	// 3. lineTo moves our virtual pen from its starting position to new coordinates, creating an invisible PATH as if with invisible ink
	// 4. stroke to actually make our path visible (plus it has options to define things like line color and thickness)

beginPath	// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/beginPath

moveTo

lineTo

stroke	// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/stroke
	// IMPORTANT NOTE: stroke(path) to specify which path to stroke! important for multiuser

// XXX Let's draw a line!
pen.beginPath();		// Initialize
pen.moveTo(0,0);		// Choose starting coordinates (top left corner of canvas)
pen.lineTo(500,500);	// Choose ending coordinates (500 pixels from top, 500 pixels from left)
pen.stroke();			// Draw the line


// XXX Add Color! *** OPTIONAL
pen.strokeStyle = red; ***before the line

// NOTE that you can use hex colors
// XXX IF TIME, group googling session: how to generate a random color!
// https://css-tricks.com/examples/RandomHexColor/


## MOUSE EVENTS!!!!

// XXX So now how do we draw a line using our mouse instead of writing lots of code?
// JavaScript has a nice built-in function that lets us do stuff based on user input events like mouse clicks etc

// XXX show the three types of events that we need: when the mouse button is pressed down, when the mouse moves,
// and when the mouse button is released

// XXX addEventListener 	-- has three parts:
	// 1. the object on the web page where the event takes place -- in this case, our canvas element
	// 2. the type of event
	// 3. the name of our function that we want to run whenever the event happens
		// NOTE this function receives a special EVENT parameter/variable, which contains information about the event like where the mouse is, etc

canvas.addEventListener('name of event goes here!', nameOfMyFunctionHere);

// XXX Group googling session to look up the events we need: https://developer.mozilla.org/en-US/docs/Web/Events

// So let's create three event listeners and three custom functions:
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', drawStuff);
canvas.addEventListener('mouseup', stopDrawing);
function startDrawing(event) {
	// do cool stuff here
}
function drawStuff(event) {
	// do cool stuff here
}
function stopDrawing(event) {
	// do cool stuff here
}

// NOTE the event parameter/variable -- we're going to use that to get information about where the mouse is when each event happens


// XXX First let's see what information we have access to by using console.log to display the contents of the event variable
function startDrawing(event) {
	console.log(event);
}


// XXX Try it out -- refresh the page, click on the page, and open up the console! You'll see some info - expand it, lots of data!

// on pageX/Y vs clientX/Y vs screenX/Y:
	// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
	// http://stackoverflow.com/questions/6073505/what-is-the-difference-between-screenx-y-clientx-y-and-pagex-y
	// and at the bottom:
	// http://www.quirksmode.org/mobile/tableViewport_desktop.html

// XXX TLDR: let's just use clientX and clientY to get the coordinates of the mouse pointer within visible part of the web page

// XXX To access the clientX property inside our event variable (which is an object, btw),
// we type event DOT clientX. XXX Let's try this out to see our X and Y coordinates more easily:
function startDrawing(event) {
	console.log("Start: " + event.clientX + ", " + event.clientY);
}


// XXX Our other two events contain the exact same information, so we can double check that they all work:
function startDrawing(event) {
	console.log("Start: " + event.clientX + ", " + event.clientY);
}
function drawStuff(event) {
	console.log("Move: " + event.clientX + ", " + event.clientY);
}
function stopDrawing(event) {
	console.log("Stop: " + event.clientX + ", " + event.clientY);
}


// XXX Test that out in the console -- you'll see a lot of information!

// XXX Now, time to put all these pieces together, so here's a little challenge:
// Let's set a timer for 5 minutes, and see if you can combine the code we have so far to make it draw wherever you move your mouse!
	// HINTS: there are only four drawing functions required to draw a line, and only 3 functions
	// that run for the 3 events, so try every combination!

... timer ...

// XXX So some people got it working where it draws a line, but only after you finish drawing it...
// XXX Here's one way to get it to draw in real time:

....
if (isDrawing) {
	pen.stroke();
}
...

### SENDING INFORMATION ON EVENTS

// XXX CHALLENGE: Using these building blocks, change your app to send a message
	// from client to server about what the client is doing with their mouse
	// and have the server recieve the data and show it in the console

// SOLUTION:
	// in local.js:
function startDrawing(event) {
	console.log("Start: " + event.clientX + ", " + event.clientY);
	pen.beginPath();
	pen.moveTo(event.clientX, event.clientY );
	socket.emit('mousedown', "Start: " + event.clientX + ", " + event.clientY);
}
function drawStuff(event) {
	console.log("Move: " + event.clientX + ", " + event.clientY);
	pen.lineTo(event.clientX, event.clientY);
	if (event.buttons) {
		pen.stroke();
	}
	socket.emit('mousemove', "Move: " + event.clientX + ", " + event.clientY);
}

	// in app.js:
socket.on('mousedown', function(data){
	console.log(data);
});
socket.on('mousemove', function(data){
	console.log(data);
});


// XXX Now to send our x and y coordinates as separate numbers ...we'll send them as an object!
socket.emit('mousedown', {x: event.clientX, y: event.clientY});
// and:
socket.emit('mousemove', {x: event.clientX, y: event.clientY});



// XXX Reviewing our diagram again showing what needs to happen..
// When the server recieves this data, it should send it back out to all the other clients except for the one that sent the data
socket.on('mousedown', function(data){
	console.log(data);
	socket.broadcast.emit('mousedown', data);
});
socket.on('mousemove', function(data){
	console.log(data);
	socket.broadcast.emit('mousemove', data);
});


// XXX And back on the client side in local.js again, we need to receive this data!
socket.on('mousedown', function(data){
	console.log(data);
});
socket.on('mousemove', function(data){
	console.log(data);
});

// XXX Be sure to refresh the page and be sure to open it in two tabs and open the console in one of them and test it!


// XXX NOW FOR THE GRAND FINALE!!!  *** CHALLENGE *** Let's draw a line on the client when it receives the data from the server:
// SOLUTION:
var isDrawing = false; // local code.... see paintdemo-broken!!!!
socket.on('mousedown', function(data){
	console.log(data);
	pen.beginPath();
	pen.moveTo(data.x, data.y);
});
socket.on('mousemove', function(data){
	console.log(data);
	pen.lineTo(data.x, data.y);
	if (isDrawing) {
		pen.stroke();
	}
});


// XXX BONUS CHALLENGE: Assign a random color to the lines drawn by each separate user!
