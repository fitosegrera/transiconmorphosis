var express = require('express');
var app = express();
var http = require('http').Server(app);
var chat_room = require('socket.io')(http);
var serialPort = require("serialport");

// route to index.html
app.use('/', express.static(__dirname + '/public'));

var ArduinoFirmata = require('arduino-firmata');
var arduino = new ArduinoFirmata();

arduino.connect(); // No arguments: use default arduino or Arguments: The serial port used by arduino ex. arduino.connect('/dev/tty.usb-device-name');
var delay = 3000;

serialPort.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log("Using Serial Port: " + port.comName);
  });
});

arduino.on('connect', function(err){
	console.log("arduino ready");
	console.log("board version"+arduino.boardVersion);
	chat_room.sockets.on('connection', function (socket) {
		socket.emit('entrance', {message: 'Welcome to the chat room!'});

		socket.on('disconnect', function  () {
		    chat_room.sockets.emit('exit', {message: 'A chatter has disconnected.'});
		});

		socket.on('chat', function  (data) {
		    chat_room.sockets.emit('chat', {message: '' + data.message, user: '' + data.user});
		  	console.log("board version"+arduino.boardVersion);
		  	console.log(data);

		  	//If the user sends an SMILY emoticon
		  	if (data.message == 'smile'){
			  	//Write to pin from arduino
				arduino.digitalWrite(8, true);

				//Delay before turning off
				setTimeout(function(){
					//Write to pin from arduino
					arduino.digitalWrite(8, false);
				},delay);
			}
			//If the user sends an WINK emoticon
		  	if (data.message == 'wink'){
			  	//Write to pin from arduino
				arduino.digitalWrite(9, true);

				//Delay before turning off
				setTimeout(function(){
					//Write to pin from arduino
					arduino.digitalWrite(9, false);
				},delay);
			}
			//If the user sends an SAD emoticon
		  	if (data.message == 'sad'){
			  	//Write to pin from arduino
				arduino.digitalWrite(10, true);

				//Delay before turning off
				setTimeout(function(){
					//Write to pin from arduino
					arduino.digitalWrite(10, false);
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

http.listen(3300);
console.log("//////////////////////////");
console.log("SERVER RUNNING CORRECTLY!!");
console.log("Please use Google-Chrome to browse http://localhost:3300 ");
