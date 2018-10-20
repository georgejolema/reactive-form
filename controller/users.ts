import express from 'express';
import User from '../entities/User';

const usersMock: User[] = [
    {
        name: 'georgejolema',
        firstName: 'Jorge',
        lastName: 'Maldonado',
        email: 'georgejolema@gmail.com',
        birthDate: new Date()
    }
];

export default function usersController() {
    const route = express.Router();
    route.get('/', (req, res) => {
        res.json(usersMock);
    });

    return route;
}
