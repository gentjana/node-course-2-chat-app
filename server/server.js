const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// redirects to public folder
const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newEmail', {
        from: 'mike@example.com',
        text: 'Hey. What is going on.',
        createdAt: 123
    });

    socket.emit('newMessage', {
        from: 'mike',
        text: 'Hello how are you?',
        createdAt: 1234
    });

    socket.on('createEmail', (email) => {
        console.log('createEmail', email);
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected from server');
    });
});

server.listen(port, () => {
    console.log('Server is up on ' + port);
});
