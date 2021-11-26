import * as path from 'path';
import * as fs from 'fs';
import { LoggerModes } from 'jet-logger';



// Set env variables
const logFilePath = path.join(__dirname, '../sampleProject.log');
process.env.OVERNIGHT_LOGGER_FILEPATH = logFilePath;
process.env.OVERNIGHT_LOGGER_MODE = LoggerModes.Console;
process.env.OVERNIGHT_LOGGER_RM_TIMESTAMP = 'false';


// Remove current log file
(function removeFile() {
    try {
        fs.unlinkSync(logFilePath);
    } catch (e) { return; }
})();



// Import and start Server. Remember, server must
// be imported after configuring env variables
import RouterServer from './server/RouterServer';

const server = new RouterServer();

server.checkPostgres()
    .then(res => console.log("POSTGRES RESPONSE", res))
    .catch(err => console.log("POSTGRES ERR", err))

server.start(4000);
