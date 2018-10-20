import usersController from './users';
import express from 'express';

export default function controller(app: express.Express) {
    app.use('/api/user', usersController());
}
