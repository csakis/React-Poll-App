var express = require('express');
var _ = require('underscore');
var app = express();
var connections = [];
var title = '';
var audience = [];
var speaker = {};
var questions = require('./app-questions');
var currentQuestion = false;
var results = {};
app.use(express.static('./public'));
app.use(express.static('./bootstrap/dist'));
var server = app.listen(process.env.PORT ||3000);
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
	socket.once('disconnect', function() {
		var member = _.findWhere(audience, { id: this.id });
		if (member) {
			audience.splice(audience.indexOf(member), 1);
			io.sockets.emit('audience', audience);
			console.log("Left: %s (%s audience members)", member.name, audience.length)
		} else if (this.id === speaker.id) {
			console.log("%s has left. '%s' is over.", speaker.name, title);
			speaker = {};
			title = "MWLUG2016 WebSocket Survey";
			io.sockets.emit('end', {title: title, speaker: ''});
		}
		connections.splice(connections.indexOf(socket), 1);
		socket.disconnect();
		console.log("Disconnected: %s sockets remaining.", connections.length);
	});

	socket.on('join', function(payload) {
		var newMember = {
			id: this.id,
			name: payload.name,
			type: 'audience'
		};
		this.emit('joined', newMember);
		audience.push(newMember);
		io.sockets.emit('audience', audience);
		console.log("Audience Joined: %s", payload.name);
	});

	socket.on('start', function(payload) {
		speaker.name = payload.name
		speaker.id = this.id;
		speaker.type = 'speaker';
		title = payload.title;
		this.emit('joined', speaker);
		io.sockets.emit('start', {title: title, speaker: speaker.name});
		console.log("Presentation Started: '%s' by %s", title, speaker.name);
	});

	socket.on('ask', function(question) {
		currentQuestion = question;
		results={};
		Object.keys(question).forEach(function(key){
			console.log("key", key, "value", question[key]);
			if (key !=="q")	{
				results[key] = 0;
			}
		});


		io.sockets.emit('ask', currentQuestion);
		io.sockets.emit('ask', currentQuestion);
		console.log("Question Asked: '%s'", question.q);
	});

	socket.on('answer', function(payload) {
		if (results[payload.choice] === undefined ||results[payload.choice] === null) {
			results[payload.choice] = 1;
		}
		else {
			results[payload.choice]++;
		}
		io.sockets.emit('results', results);
		console.log("Answer: '%s' - %j", payload.choice, results);
	});

	socket.emit('welcome', {
		title: title,
		audience: audience,
		speaker: speaker.name,
		questions: questions,
		currentQuestion: currentQuestion,
		results: results
	});

	connections.push(socket);
    console.log("Connected: %s sockets connected.", connections.length);
});

console.log("Polling server is running." );
