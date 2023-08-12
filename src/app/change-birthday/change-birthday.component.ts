/** Importing */
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
  /** Importing API calls */
import { UserRegistrationService } from '../fetch-api-data.service'

@Component({
  selector: 'app-change-birthday',
  templateUrl: './change-birthday.component.html',
  styleUrls: ['./change-birthday.component.scss']
})

/** This class is used to change the user's birthday. */
export class ChangeBirthdayComponent implements OnInit {
  user: any = localStorage.getItem('user');
  parsedUser: any = JSON.parse(this.user)
  
  //** Used to declare userData from the inputs 'change-birthday.component.html' */
  @Input () userData = { 
    Username: this.parsedUser.Username, 
    Password: '', 
    Email: this.parsedUser.Email, 
    Birthday: ''
  }

  /** Declaring variables for components injected to this components */
  constructor(
    public FetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<ChangeBirthdayComponent>,
    public snackBar: MatSnackBar
   ) { }

  /** @ignore */
  ngOnInit(): void {
  }

  /** This function calls 'editUser()' function from 'UserRegistrationService' */
  changeBirthday(): void {
    this.FetchApiData.editUser(this.userData)
      /** Logic at success*/
      .subscribe((result) => {
        console.log(result);
        localStorage.setItem('user', JSON.stringify(result))
        this.dialogRef.close();
        this.snackBar.open('Birthday changed', 'OK', {
          duration: 2000
        });
        window.location.reload();
      /** Logic at fail */
      }, (result) => {
        console.log(result)
        this.snackBar.open(`Something went wrong. ${result}`, 'OK', {
          duration: 2000
        });
      });
  }
}
