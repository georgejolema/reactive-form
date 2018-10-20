import path from 'path';
import usersController from './users';
import express from 'express';

export function pages(app: express.Express, dirName: string) {
    app.get('/user', (req, res) => res.sendFile(path.join(dirName, 'dist', 'index.html')));
}

export function controller(app: express.Express) {
    app.use('/api/user', usersController());
}
