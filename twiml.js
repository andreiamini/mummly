var http = require('http');
var app = require('./app.js');
var twilio = require('twilio');

http.createServer(function (req, res) {
    //Create TwiML response
    var resp = new twilio.TwimlResponse();

    resp.say("Happy Mother's Day " + app.myname)
        .pause({ length:3 })
        .say("Yo", {
            voice:'woman',
            language:'en-gb'
        })
        .play('http://www.example.com/some_sound.mp3');

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(resp.toString());

}).listen(1337, '127.0.0.1');

console.log('TwiML servin\' server running at http://127.0.0.1:1337/');

/**
Outputs the following:
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>Welcome to Twilio!</Say>
    <Pause length="3"></Pause>
    <Say voice="woman" language="en-gb">Please let us know if we can help during your development.</Say>
    <Play>http://www.example.com/some_sound.mp3</Play>
</Response>
*/
