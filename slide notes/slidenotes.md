Next time I should cut out the GitHub/Heroku stuff altogether or just have it there for people to follow along on their own; but there's no sense in walking people through step by step for those parts! I could just give them a screencast video to watch before or after the class, or a printed-out worksheet even!

Nobody wants to hear me talk about code that's up on projector, especially if they have other things right in front of them that are more compelling and immediate. All code walkthroughs should be interactive!

I need to emphasize building the application from the ground up, showing it getting progressively more interesting and real step-by-step and customizing it so they can take ownership of the code

I need to talk about websockets and client-server stuff more, and make that diagram I had in mind of two talking heads, both sending and receiving information, and mapping socket.io functions to ears and mouths

I need to remember to introduce myself at the beginning, and to tell people that we meet weekly, and that they can join our Slack chat, and to donate moneyz

These workshops should increasingly become more of just one part of a larger array of content and tools that I'm making!

If we have time I would LOVE to show off more than just that one chat demo!

Print out pieces of paper with instructions like wifi info and link to the slides!

GROUP GOOGLING - assign everyone or every table a topic to google and see what they find

MUST have everyone actually create the app, write socket.io code, from the ground up, or at least on top of a typical boilerplate

Note that NO SECURITY whatsoever!

tell them about Nodemon!!! maybe install it!

save static slides somewhere more permanent and update the "slides" permalink at the bottom of my dynamic slides

make a slide about node, about express, about SocketIO

make a slide about websockets, telegraph vs telephone, and client/server stuff

# NOTES

## HOW TO OPEN THE CONSOLE



.... VARIABLES
.... STRING CONCATENATION
.... FUNCTIONS
.... CONDITIONAL STATEMENTS AND OPERATORS ??
.... CUSTOM FUNCTIONS
.... EVENT LISTENERS
.... NEED TO INTRODUCE OBJECTS, DOT NOTATION, AND OBJECT LITERALS VERY BRIEFLY !!!

...

## VARIABLES, FUNCTIONS, INTRO IN CONSOLE

// alert is a built-in JavaScript function
// Let's run it in the console like this:

```
// Now let's run a JavaScript function!

// Type this into the console and hit enter:
alert("Hello, world!");
```

```
// Define a new variable with the "var" keyword like this:
var myName = "Liz";
```

```
// Once you define a variable,
// you can change it or reuse it:
myName = "Awesome McAwesomePants";
```

```
// You can use variables inside of functions like this:
alert(myName);
```

// Text values are called "strings" in computer science jargon,
// and you can string them together like this:
```
var myGreeting = "Hi, my name is " + myName + "!";
```

// You can create your own JavaScript functions too!
// Functions are made in two steps:
// 1. Defining functions, and 2. calling (or using) functions

```
// Defining a very simple function:
function myCoolFunction() {
	alert("Running my cool function!");
}

// Calling our function to actually use it:
myCoolFunction();
```

// Your function can also use variables!
// Let's change the definition:
```
function myCoolFunction(name, message) {
	alert("Hi, " + name + "! Your message is: " + message);
}

myCoolFunction("Liz", "I know JavaScript!");
```

## INTERACTING WITH THE PAGE VIA CONSOLE


```
// getElementByID() is a built-in function that lets us
// access an element of our web page with a certain ID:

var myButton = document.getElementById("testbutton");

// The HTML for the button on this page looks like this:
// <button id="testbutton">Click me!</button>
```

```
// Let's do the same with the box below the button:
var displayBox = document.getElementById("testdisplay");
```


```
// We can change the text inside an HTML element:
displayBox.textContent = "testing one two three!";

```


```
// Now let's define a new function that does it:

function sayHello() {
	displayBox.textContent = "Hello there!";
};
```

```
// And let's call the function to check that it works:

sayHello();
```


// Finally, let's make this function run when we click the button!

```
// addEventListener() is another built-in function
// that lets us do stuff when certain events happen:
myButton.addEventListener("click", sayHello);
```

// It has 3 parts:
//   1) the HTML element where the event happens (myButton)
//   2) the type of event ("click")
//		https://developer.mozilla.org/en-US/docs/Web/Events
//   3) the function to run when the event happens (sayHello)

// Notice that we're treating the entire function like a variable!
// That lets us use functions in other functions. Cool right?


// FULL CODE, EXAMPLE HERE: http://codepen.io/LearnToCodeLA/pen/ZONyjP


var myButton = document.getElementById("testbutton");
var displayBox = document.getElementById("testdisplay");

function sayHello() {
	displayBox.textContent = "Hello there!";
};

myButton.addEventListener("click", sayHello);
