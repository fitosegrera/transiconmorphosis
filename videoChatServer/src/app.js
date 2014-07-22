var sys = require('sys')
var exec = require('child_process').exec;
var myIP = require('my-ip');
var serialPort = require("serialport");

function puts(error, stdout, stderr) {sys.puts(stdout)}
ip = myIP();

exec("ifconfig en1 | grep inet | grep -v inet6 | awk '{print $2}' > local_ip.txt", puts);
exec("node server.js", puts);
console.log("_______________________________");
console.log("WELCOME TO TRANSICONMORPHOSIS!!");
console.log("You are the ARTIST/PERFORMER");
console.log("Open GOOGLE CHROME and browse http://localhost:2013");
console.log("The other computer (the user) must browse http://"+ip+":2013");
console.log("Stun Server running on PORT:8888, using the url: stun:stun.l.google.com:19302");
console.log("----------");
console.log("Serial-Ports Detected:");
serialPort.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
  });
});