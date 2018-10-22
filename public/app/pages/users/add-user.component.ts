import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
    form: FormGroup;
    constructor(private router: Router) {
        this.form =  this.createFormGroup();
    }

    createFormGroup() {
        return new FormGroup({
            username: new FormControl(),
            firstname: new FormControl(),
            lastname: new FormControl(),
            email: new FormControl(),
            birthdate: new FormControl()
        });
    }

    goBack() {
        this.router.navigate(['/user']);
    }

    onSubmit() {
        console.log(this.form);
    }
}
