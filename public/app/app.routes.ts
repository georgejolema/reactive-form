import { Routes } from '@angular/router';
import { ListUserComponent } from './pages/users/list-user.component';
import { RootPageComponent } from './pages/root-page.component';

export const appRoutes: Routes = [
    {
        path: 'user',
        component: ListUserComponent
    },
    {
        path: '',
        component: RootPageComponent
    }
];
