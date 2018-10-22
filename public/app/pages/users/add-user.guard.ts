import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AddUserComponent } from './add-user.component';

@Injectable()
export class AddUserGuard implements CanDeactivate<AddUserComponent> {
    constructor() {}
    canDeactivate(component: AddUserComponent, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return component.canDeactivate() || window.confirm('Are you sure you want to leave without saving?');
    }
}
