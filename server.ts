import express from 'express';
import controller from './controller';

const server = express();

server.use(express.static('dist'));
controller(server);

server.get('/', (req, res) => {
    res.sendFile('index.html');
});

server.listen(4200, () => {
    console.log('listening port 4200');
});
