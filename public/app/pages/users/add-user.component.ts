import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { merge, fromEvent } from 'rxjs/index';
import { map, debounceTime } from 'rxjs/operators';
import User from '../../../../entities/User';
import { UserService } from '../../services/user';
import { AddressService } from '../../services/address';

@Component({
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
    userForm: FormGroup;
    validityObservables: ValidityObservables = new ValidityObservables();
    countries$: Observable<string[]> = this.apiAddress.getCountries();

    @ViewChild('formelement') formElement: ElementRef;
    private submitEvent$: Observable<any>;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private apiUser: UserService,
        private apiAddress: AddressService) {}

    ngOnInit() {
        this.userForm =  this.createFormGroup();
        this.submitEvent$ = fromEvent(this.formElement.nativeElement, 'submit');
        this.configFormGroups();
    }

    private createFormGroup() {
        return this.fb.group({
            username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
            firstname: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
            lastname: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
            email: ['', [Validators.required, Validators.pattern(/[a-zA-Z0-9]+@[a-zA-Z0-9]+\.com$/)]],
            birthdate: ['', [Validators.required, Validators.pattern(/[0-9]{2}-[0-9]{2}-[0-9]{4}$/)]],
            enableAddress: ['']
        });
    }

    private configFormGroups() {
        this.validityObservables.isEmailValid$ = this.debounceElement('email');
        this.validityObservables.isBirthDateValid$ = this.debounceElement('birthdate');
        this.validityObservables.isFirstNameValid$ = this.debounceElement('firstname');
        this.validityObservables.isLastNameValid$ = this.debounceElement('lastname');
        this.validityObservables.isUserNameValid$ = this.debounceElement('username');
    }

    private debounceElement(name: string) {
        const debounce$ = this.userForm
            .get(name)
            .valueChanges
            .pipe(
                debounceTime(1000),
                map(() => this.isTouchedAndError(name))
            );

        const submit$ = this.submitEvent$.pipe(map(() => {
            if (this.userForm.invalid) {
                this.userForm.get(name).markAsTouched();
            }
            return this.isTouchedAndError(name);
        }));

        return merge(debounce$, submit$);
    }

    private isTouchedAndError(name: string) {
        return (!!this.userForm.get(name).dirty || !!this.userForm.get(name).touched) && !!this.userForm.get(name).errors;
    }

    private formatDate(strDate: string) {
        const arrDate = strDate.split('-');
        const day = Number.parseInt(arrDate[0], 10);
        const month = Number.parseInt(arrDate[1], 10) - 1;
        const year = Number.parseInt(arrDate[2], 10);

        return new Date(year, month, day, 0, 0, 0, 0);
    }

    canDeactivate() {
        return this.userForm.pristine || this.userForm.valid;
    }

    goBack() {
        this.router.navigate(['/user']);
    }

    validateTextInputs(name: string, alias: string) {
        const element = this.userForm.get(name);
        if (element.errors) {
            if (element.errors.required) {
                return `The field ${alias} is required`;
            } else if (element.errors.minlength || element.errors.maxlength) {
                return `The field ${alias} must have between 5 and 50 characters`;
            }
        }

        return '';
    }

    validateSpecialInput(name: string, alias: string) {
        const element = this.userForm.get(name);
        if (element.errors) {
            if (element.errors.required) {
                return `The field ${alias} is required`;
            } else if (element.errors.pattern) {
                return `The field ${alias} is not correct`;
            }
        }

        return '';
    }

    onSubmit() {
        if (this.userForm.valid) {
            const newUser: User = {
                firstName: this.userForm.value.firstname,
                lastName: this.userForm.value.lastname,
                name: this.userForm.value.username,
                email: this.userForm.value.email,
                birthDate: this.formatDate(this.userForm.value.birthdate)
            };

            this.apiUser.addUser(newUser).subscribe((result) => {
                this.goBack();
            });
        }
    }
}

class ValidityObservables {
    isEmailValid$: Observable<boolean>;
    isFirstNameValid$: Observable<boolean>;
    isLastNameValid$: Observable<boolean>;
    isUserNameValid$: Observable<boolean>;
    isBirthDateValid$: Observable<boolean>;
}
