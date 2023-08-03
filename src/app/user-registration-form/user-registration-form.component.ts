//import
import { Component, OnInit, Input } from '@angular/core';
  //Materials
import { MatDialogRef }  from '@angular/material/dialog'; //to close the dialog on success
import { MatSnackBar } from '@angular/material/snack-bar'; //to display notifications back to the user
  //import API calls
import { UserRegistrationService } from '../fetch-api-data.service';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: ''};

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  registerUser() : void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      //logic for succesful user registration
      console.log(result)
      this.dialogRef.close(); //closes the modal on success
      this.snackBar.open('User registration successful', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      })
    })
  }
}
