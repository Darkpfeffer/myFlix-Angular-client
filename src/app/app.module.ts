import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import materials
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';
//import self-made components
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';
import { ChangeUsernameComponent } from './change-username/change-username.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { ChangeBirthdayComponent } from './change-birthday/change-birthday.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { GenreComponent } from './genre/genre.component';
import { DirectorComponent } from './director/director.component';
import { MovieSummaryComponent } from './movie-summary/movie-summary.component';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix'},
  { path: 'profile', component: UserProfilePageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    UserProfilePageComponent,
    ChangeUsernameComponent,
    ChangePasswordComponent,
    ChangeEmailComponent,
    ChangeBirthdayComponent,
    DeleteAccountComponent,
    GenreComponent,
    DirectorComponent,
    MovieSummaryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    MatSnackBarModule,
    MatMenuModule,
    MatGridListModule,
    FormsModule,
    LayoutModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
