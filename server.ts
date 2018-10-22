import express from 'express';
import {controller, pages} from './controller';
import bodyParser = require('body-parser');

const server = express();

server.use(express.static('dist'));
server.use(bodyParser.json());
controller(server);
pages(server, __dirname);

server.get('/', (req, res) => {
    res.sendFile('index.html');
});

server.listen(4200, () => {
    console.log('listening port 4200');
});
