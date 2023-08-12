/** Importing */
import { Component, OnInit, Input } from '@angular/core';
  /** Importing Materials */
import { MatDialogRef }  from '@angular/material/dialog'; //to close the dialog on success
import { MatSnackBar } from '@angular/material/snack-bar'; //to display notifications back to the user
  /** Importing API calls */
import { UserRegistrationService } from '../fetch-api-data.service';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

/** This class handles the registration of the user */
export class UserRegistrationFormComponent implements OnInit {
  /** Used to declare userData from the inputs 'user-registration-form.component.html' */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: ''};

    /** Declaring variables for components injected to this components */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

    /** @ignore */
  ngOnInit(): void {
  }

    /** 
     * This function uses the 'userRegistration()' function 
     * from 'UserRegistrationComponent' 
     */
  registerUser() : void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      /** logic for successful user registration */
      this.dialogRef.close(); /** closes the modal on success */
      this.snackBar.open('User registration successful', 'OK', {
        duration: 2000
      });
      /** Logic for unsuccessful user registration*/
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      })
    })
  }
}
