import { Component } from '@angular/core';
import { UserService } from './services/user';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    constructor(private apiUser: UserService) {

    }
}
