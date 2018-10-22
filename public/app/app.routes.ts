import { Routes } from '@angular/router';
import { ListUserComponent } from './pages/users/list-user.component';
import { RootPageComponent } from './pages/root-page.component';
import { AddUserComponent } from './pages/users/add-user.component';
import { AddUserGuard } from './pages/users/add-user.guard';

export const appRoutes: Routes = [
    {
        path: 'user',
        component: ListUserComponent
    },
    {
        path: 'user/add',
        component: AddUserComponent,
        canDeactivate: [AddUserGuard]
    },
    {
        path: '',
        component: RootPageComponent
    }
];
