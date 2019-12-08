'use strict';

require('dotenv').config();

const path = require('path'),
    isValid = require('is-valid-path');

// Set Directories
global.__serverRoot = __dirname;
global.__filesdir = path.resolve(__serverRoot + '/../files');

if (process.env.USE_CUSTOM_BUILDS_DIRECTORY === 'TRUE')
{
    if (isValid(process.env.CUSTOM_BUILDS_DIRECTORY))
    {
        global.__buildsdir = process.env.CUSTOM_BUILDS_DIRECTORY
    }
    else
    {
        console.error('EQLab: Custom Builds Directory is Not Valid. Check .env');
        process.exit(1);
    }
}
else
{
    global.__buildsdir = path.resolve(__filesdir + '/builds');
}

global.__tempdir = path.resolve(__serverRoot + '/temp');

/***********************************************************************************************/

const app = require(__serverRoot + '/app.js'),
    server = require('http').Server(app),
    debug = require('debug')('eqlab'),
    //io = require(__serverRoot + '/io').initialize(server),
    nodeCleanup = require('node-cleanup'),
    knex = require(__serverRoot + '/db/db.js').knex,
    sqlEvent = require(__serverRoot + '/db/db.js').sqlEvent,
    eqlab_db = require(__serverRoot + '/models/sequelize').sequelize;


/***********************************************************************************************/

const PORT = normalizePort(process.env.PORT || '3000');
app.set('port', PORT);

// For nginx/Apache Reverse Proxy
if (process.env.USE_REVERSE_PROXY === 'TRUE')
{
    app.enable('trust proxy');
}

console.log('EQLab: Server Root Directory: ' + __serverRoot);
console.log('EQLab: Files Directory: ' + __filesdir);
console.log('EQLab: Builds Directory: ' + __buildsdir);

// Sync EQLab Database
eqlab_db.sync()
    .then(() =>
    {
        console.log('EQLab: EQLab Database Connection Successful');

        // Start Express Server
        server.listen(PORT, 'localhost', () =>
        {
            console.log('EQLab: Launching Server, listening on PORT ' + PORT);

            // Cleanup on Process Exit
            nodeCleanup((exitCode, signal) =>
            {
                if (signal)
                {
                    console.log('EQLab: Cleaning Up Before Process Exit')
                    
                    knex.destroy(() =>
                    {
                        //sqlEvent.stop();
                        eqlab_db.close();
                        process.kill(process.pid, signal); // Calling process.exit() won't inform parent process of signal
                    });

                    nodeCleanup.uninstall(); // Don't Call Cleanup Handler Again 
                    return false;
                }
            });
        });
    })
    .catch(err =>
    {
        console.error(err, 'EQLab: EQLab Database Connection Failed. Check Configuration Options');
    });

server.on('error', onError);
server.on('listening', onListening);

// Normalize a port into a number, string, or false
function normalizePort(val)
{
    const port = parseInt(val, 10);

    if (isNaN(port))
    {
        // named pipe
        return val;
    }

    if (port >= 0)
    {
        // port number
        return port;
    }

    return false;
}

// Event listener for HTTP server "error" event
function onError(error)
{
    if (error.syscall !== 'listen')
    {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code)
    {
        case 'EACCES':
        {
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        }  
        case 'EADDRINUSE':
        {
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        }
        default:
        {
            throw error;
        }
    }
}

// Event listener for HTTP server "listening" event.
function onListening()
{
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;

    debug('Listening on ' + bind);
}