import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:7778');

const init = (messageReceivedHandler, newConnectionHandler, disconnectHandler) => {
    socket.on('new_connection', function() {
        newConnectionHandler()
    })

    socket.on('disconnect', function() {
        disconnectHandler()
    })

    socket.on('message_received', (x) => {
        messageReceivedHandler(x)
    })
};

export { 
    init
};