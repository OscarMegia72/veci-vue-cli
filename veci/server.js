#!/usr/bin/env node
/***
 *     _______ _______ ______ _______ ______      _______ _______ _______ _______ _______ 
 *    |       |     __|      |   _   |   __ \    |   |   |    ___|     __|_     _|   _   |
 *    |   -   |__     |   ---|       |      <    |       |    ___|    |  |_|   |_|       |
 *    |_______|_______|______|___|___|___|__|    |__|_|__|_______|_______|_______|___|___|
 *                                                                                        
 */
const logger = require('morgan');
const app = require('./app');
const http = require('http');
const port = normalizePort(process.env.SERVER_ONE_PORT || '4000');
const path = require('path')
const moment = require('moment')
// server init
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
//--
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    console.log("SERVER LISTENING: ", port)
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    global.bind = bind
    global.pathBase = path.join(__dirname, '../../')
    // servicios
    console.info("==================================")
    console.info(`Server Minimal - Start on ${port}, ${moment().format('HH:mm:ss')}`)
    console.info("==================================")
}
