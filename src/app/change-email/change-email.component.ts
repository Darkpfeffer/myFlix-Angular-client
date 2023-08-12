/** Importing */
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
  /** Importing API calls */
import { UserRegistrationService } from '../fetch-api-data.service'

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})

/** This class is used to change the user's email. */
export class ChangeEmailComponent implements OnInit {
  user: any = localStorage.getItem('user');
  parsedUser: any = JSON.parse(this.user)
  
  //** Used to declare userData from the inputs 'change-email.component.html' */
  @Input () userData = { 
    Username: this.parsedUser.Username, 
    Password: '', 
    Email: '', 
    Birthday: this.parsedUser.Birthday
  }

  /** Declaring variables for components injected to this components */
  constructor(
    public FetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<ChangeEmailComponent>,
    public snackBar: MatSnackBar
   ) { }

  /** @ignore */
  ngOnInit(): void {
  }

  /** This function calls 'editUser()' function from 'UserRegistrationService' */
  changeEmail(): void {
    this.FetchApiData.editUser(this.userData)
      /** Logic at success*/
      .subscribe((result) => {
        console.log(result);
        localStorage.setItem('user', JSON.stringify(result))
        this.dialogRef.close();
        this.snackBar.open('Email changed', 'OK', {
          duration: 2000
        });
        window.location.reload();
      /** Logic at fail */
      }, (result) => {
        this.snackBar.open(`Something went wrong. ${result}`, 'OK', {
          duration: 2000
        });
      });
  }
}
