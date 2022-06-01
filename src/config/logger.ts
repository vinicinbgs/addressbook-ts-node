import fs from 'fs';
import pinoHttp from 'pino-http';

let stream = null;

if (process.env.LOG_OUTPUT === 'file') {
  stream = fs.createWriteStream('./src/pino.log');
}

const logger = pinoHttp(stream);

export default logger;
