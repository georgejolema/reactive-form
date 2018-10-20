import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { UserService } from './services/user';
import { NabBarComponent } from './components/nabBar.component';
import { appRoutes } from './app.routes';
import { ListUserComponent } from './pages/users/list-user.component';
import { RootPageComponent } from './pages/root-page.component';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [AppComponent, NabBarComponent, ListUserComponent, RootPageComponent],
    providers: [UserService],
    imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(appRoutes)]
})
export class AppModule {

}
