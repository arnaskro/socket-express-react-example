// Imports
var express = require('express')
var app = express()
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var cors = require('cors')

// Server Config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.listen(7777, function() {
    console.log("~ Server started. http://localhost:7777/");
});

// Data
let messages = [
    {
        name: "bob",
        message: "Hello World"
    },
    {
        name: "john",
        message: "Hi"
    }
];
let users = [];

// Routes
app.get('/', function (req, res) {
    console.log("GET /")
    res.send(messages)
})

app.post('/', function (req, res) {
    console.log("POST /")
    console.log(req.body)
    let message = req.body;
    messages.push(message);
    io.emit('message_received', message)
    res.send(message);
})

// Events
io.on('connection', function (client) {
    io.emit('new_connection');

    client.on('disconnect', function (data) {
        io.emit('disconnect');
    });
});

io.listen(7778);