import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { UserService } from './services/user';
import { NabBarComponent } from './components/nabBar.component';
import { appRoutes } from './app.routes';
import { ListUserComponent } from './pages/users/list-user.component';
import { RootPageComponent } from './pages/root-page.component';
import { AddUserComponent } from './pages/users/add-user.component';
import { AddUserGuard } from './pages/users/add-user.guard';
import { AddressService } from './services/address';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NabBarComponent,
        ListUserComponent,
        RootPageComponent,
        AddUserComponent
    ],
    providers: [UserService, AddressService, AddUserGuard],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes)
    ]
})
export class AppModule {

}
