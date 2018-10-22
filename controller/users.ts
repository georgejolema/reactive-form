import express from 'express';
import request from 'request';



export default function usersController() {
    const route = express.Router();
    route.get('/', (req, res) => {
        request.get('http://localhost:9000/user').pipe(res);
    });

    route.post('/', (req, res) => {
       const user = req.body;
       const options = {
        uri: 'http://localhost:9000/user',
        method: 'POST',
        json: {
            user
        }
      };

      request(options).pipe(res);
    });

    return route;
}
