import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user';
import User from '../../entities/User';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    greet = 'my component';
    users: User[] = [];

    constructor(private apiUser: UserService) {

    }

    ngOnInit() {
        this.apiUser.getUsers().subscribe((users) => this.users = users);
    }
}
