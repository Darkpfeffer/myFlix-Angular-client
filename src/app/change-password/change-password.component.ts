/** Importing */
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
  /** Importing API calls */
import { UserRegistrationService } from '../fetch-api-data.service'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})

/** This class is used to change the user's password. */
export class ChangePasswordComponent implements OnInit {
  user: any = localStorage.getItem('user');
  parsedUser: any = JSON.parse(this.user)
  
  //** Used to declare userData from the inputs 'change-password.component.html' */
  @Input () userData = { 
    Username: this.parsedUser.Username, 
    Password: '', 
    Email: this.parsedUser.Email, 
    Birthday: this.parsedUser.Birthday
  }

  /** Declaring variables for components injected to this components */
  constructor(
    public FetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    public snackBar: MatSnackBar,
    private router: Router
   ) { }

  /** @ignore */
  ngOnInit(): void {
  }

  /** This function calls 'editUser()' function from 'UserRegistrationService' */
  changePassword(): void {
    this.FetchApiData.editUser(this.userData)
      /** Logic at success */
      .subscribe((result) => {
        console.log(result);
        localStorage.setItem('user', JSON.stringify(result))
        this.dialogRef.close();
        this.snackBar.open('Password changed', 'OK', {
          duration: 2000
        });
        this.router.navigate(['welcome'])
      /** Logic at fail */
      }, (result) => {
        this.snackBar.open(`Something went wrong. ${result}`, 'OK', {
          duration: 2000
        });
      });
  }
}
