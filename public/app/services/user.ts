import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import User from './../../../entities/User';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) {}

    getUsers(): Observable<User> {
        return this.http.get<User>('api/user');
    }

    addUser(user: User) {
        return this.http.post('api/user', user);
    }
}
