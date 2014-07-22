var static = require('node-static');
var http = require('http');
var io = require('socket.io'),
connect = require('connect');

var app = connect().use(connect.static('public')).listen(2013);
var chat_room = io.listen(app);

var ArduinoFirmata = require('arduino-firmata');
var arduino = new ArduinoFirmata();

arduino.connect(); // No arguments: use default arduino or Arguments: The serial port used by arduino ex. arduino.connect('/dev/tty.usb-device-name');
var delay = 3000;

arduino.on('connect', function(){
	chat_room.sockets.on('connection', function (socket) {
		socket.emit('entrance', {message: 'Welcome to the chat room!'});

		socket.on('disconnect', function  () {
		    chat_room.sockets.emit('exit', {message: 'A chatter has disconnected.'});
		});

		socket.on('chat', function  (data) {
		    chat_room.sockets.emit('chat', {message: '' + data.message, user: '' + data.user});
		  	console.log("board version"+arduino.boardVersion);
		  	
		  	//If the user sends an SMILY emoticon
		  	if (data.message == 'smile'){
			  	//Write to pin from arduino
				arduino.digitalWrite(13, true);

				//Delay before turning off
				setTimeout(function(){
					//Write to pin from arduino
					arduino.digitalWrite(13, false);
				},delay);
			}
			//If the user sends an WINK emoticon
		  	if (data.message == 'smile'){
			  	//Write to pin from arduino
				arduino.digitalWrite(12, true);

				//Delay before turning off
				setTimeout(function(){
					//Write to pin from arduino
					arduino.digitalWrite(13, false);
				},delay);
			}
			//If the user sends an SAD emoticon
		  	if (data.message == 'smile'){
			  	//Write to pin from arduino
				arduino.digitalWrite(11, true);

				//Delay before turning off
				setTimeout(function(){
					//Write to pin from arduino
					arduino.digitalWrite(13, false);
				},delay);
			}
		});
		chat_room.sockets.emit('entrance', {message: 'A new chatter is online.'});
	});
});
  

//var file = new(static.Server)();
/*var app = http.createServer(function (req, res) {
  file.serve(req, res);
}).listen(2013);*/


console.log("//////////////////////////");
console.log("SERVER RUNNING CORRECTLY!!");
console.log("Please use Google-Chrome to browse http://localhost:2013 ");
