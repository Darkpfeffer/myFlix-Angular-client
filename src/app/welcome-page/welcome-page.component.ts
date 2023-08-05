import { Component, OnInit } from '@angular/core';
  // Material
import { MatDialog } from '@angular/material/dialog';

//Self made components
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  //Opens the dialog when the signup button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      //Assigning dialog width
      width: '480px'
    });
  }

  //Opens the dialog when login button is clicked
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      //Assigning dialog width
      width: '480px'
    })
  }
}
