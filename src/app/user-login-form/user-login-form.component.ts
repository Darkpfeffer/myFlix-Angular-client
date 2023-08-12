/** Importing */
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
  /** Importing API calls */
import { UserRegistrationService } from '../fetch-api-data.service'

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

/** This class handles the user login */
export class UserLoginFormComponent implements OnInit{
  //** Used to declare userData from the inputs 'user-login-form.component.html' */
  @Input() userData = { Username: '', Password: ''};

  /** Declaring variables for components injected to this components */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {  }

  /** @ignore */
  ngOnInit(): void {
  }

  /** 
   * Sending Input to the backend using 'userLogin()' function from 'UserRegistrationService'.
  */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData)
      /** Logic for a successful login */
      .subscribe((result) => {
        localStorage.setItem('user', JSON.stringify(result.user))
        localStorage.setItem('token', result.token)
        this.dialogRef.close(); //The modal closes on success
        this.snackBar.open('Logged in successfully!', 'OK', {
          duration: 2000
        });
        this.router.navigate(['movies'])
    }, (result) => {
      /** Logic for failed login */
      this.snackBar.open('Incorrect username or password.', 'OK', {
        duration: 2000
      });
    });
  }
}
