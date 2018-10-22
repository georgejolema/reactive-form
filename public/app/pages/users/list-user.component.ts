import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user';
import User from '../../../../entities/User';

@Component({
    templateUrl: './list-user.component.html',
    styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
    users: User[] = [];
    pages: number[] = [];
    totalPages: number;
    page: number;
    constructor(private apiUser: UserService, private router: Router) {

    }

    ngOnInit() {
        this.apiUser.getUsers().subscribe( (users) => {
            this.users = users.reverse();
            this.totalPages = Math.floor(users.length / 10);
            if (this.totalPages % 10 !== 0) { this.totalPages++; }
            this.page = 1;
            this.pages = Array
                .apply(null, new Array(this.totalPages))
                .map((data: any, index: number) => index + 1);
        });
    }

    getDataSet() {
        return this.users.slice((this.page - 1) * 10, this.page * 10);
    }

    addUser() {
        this.router.navigate(['./user/add']);
    }

    turnPage(index: number) {
        this.page = index;
    }
}
