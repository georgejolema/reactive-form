import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { UserService } from '../../services/user';
import User from '../../../../entities/User';

@Component({
    templateUrl: './list-user.component.html'
})
export class ListUserComponent implements OnInit {
    users$: Observable<User[]>;
    constructor(private apiUser: UserService, private router: Router) {

    }

    ngOnInit() {
        this.users$ = this.apiUser.getUsers();
    }

    addUser() {
        this.router.navigate(['./user/add']);
    }
}
