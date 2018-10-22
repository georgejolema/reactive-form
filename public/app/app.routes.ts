import { Routes } from '@angular/router';
import { ListUserComponent } from './pages/users/list-user.component';
import { RootPageComponent } from './pages/root-page.component';
import { AddUserComponent } from './pages/users/add-user.component';

export const appRoutes: Routes = [
    {
        path: 'user',
        component: ListUserComponent
    },
    {
        path: 'user/add',
        component: AddUserComponent
    },
    {
        path: '',
        component: RootPageComponent
    }
];
