//import
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

  //To make API calls
import { UserRegistrationService } from '../fetch-api-data.service'

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit{
  //Input needs to log in
  @Input() userData = { Username: '', Password: ''};

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) {  }

  ngOnInit(): void {
  }

  //Sending Input to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      //Logic for a successful login
      console.log(result)
      localStorage.setItem('user', JSON.stringify(result.user))
      localStorage.setItem('token', result.token)
      console.log(localStorage.getItem('user'))
      console.log(localStorage.getItem('token'))
      this.dialogRef.close(); //The modal closes on success
      this.snackBar.open('Logged in successfully!', 'OK', {
        duration: 2000
      });
    }, (result) => {
      //Logic for failed login
      this.snackBar.open('Incorrect username or password.', 'OK', {
        duration: 2000
      });
    });
  }
}
