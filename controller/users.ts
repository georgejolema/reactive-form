import express from 'express';

export default function usersController() {
    const route = express.Router();
    route.get('/', (req, res) => {
        res.json({
            greet: 'hello'
        });
    });

    return route;
}
