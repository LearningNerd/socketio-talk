

WHAT IS WEBSOCKET ??

HTTP

WEB SOCKETS --
- theres a  protocol and an API

- telegram vs telephone! telegrams have more overhead for sending each message,
can only send info in one direction at a time and then wait for response which makes it slower,
whereas on a telephone both people can talk and hear each other at the exact same time,
and you only need to set up the connection once when you make the phone call, low overhead to continue the conversation!
	- HTTP uses request-response,
		- WebSocket allows communication in both directions simultaneously
	- HTTP is asymmetric; PULL protocol, the client must request first
		- once a WebSocket connection is open, server can send to client on its own too, bidirectional so also PUSH protocol
	- HTTP has more overhead, reestablishing a connection each time, sending more stuff in the HTTP headers
		- WebSocket messages are much much smaller, maybe show graph taken from websocket.org!




IMAGES:
https://www.ntu.edu.sg/home/ehchua/programming/webprogramming/HTTP_Basics.html
https://en.wikipedia.org/wiki/Walkie-talkie
https://en.wikipedia.org/wiki/File:J38TelegraphKey.jpg
https://en.wikipedia.org/wiki/File:WatsonLloydGeorgeTelegram.jpg
https://en.wikipedia.org/wiki/Transatlantic_telegraph_cable

REFERENCE:

WebSocket API:
https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API
https://www.w3.org/TR/websockets/

WebSocket Protocol:
https://tools.ietf.org/html/rfc6455

Intro to WebSocket tutorial:
http://blog.teamtreehouse.com/an-introduction-to-websockets

More on HTTP :
https://www.ntu.edu.sg/home/ehchua/programming/webprogramming/HTTP_Basics.html
https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol
