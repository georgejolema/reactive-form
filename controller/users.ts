import express from 'express';
import request from 'request';



export default function usersController() {
    const route = express.Router();
    route.get('/', (req, res) => {
        request.get('http://localhost:9000/user').pipe(res);
    });

    return route;
}
