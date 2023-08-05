import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
  //To make API calls
import { UserRegistrationService } from '../fetch-api-data.service'

@Component({
  selector: 'app-change-birthday',
  templateUrl: './change-birthday.component.html',
  styleUrls: ['./change-birthday.component.scss']
})
export class ChangeBirthdayComponent implements OnInit {
  user: any = localStorage.getItem('user');
  parsedUser: any = JSON.parse(this.user)
  
  @Input () userData = { 
    Username: this.parsedUser.Username, 
    Password: '', 
    Email: this.parsedUser.Email, 
    Birthday: ''
  }

  constructor(
    public FetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<ChangeBirthdayComponent>,
    public snackBar: MatSnackBar
   ) { }

  ngOnInit(): void {
  }

  changeBirthday(): void {
    this.FetchApiData.editUser(this.userData).subscribe((result) => {
      console.log(result);
      localStorage.setItem('user', JSON.stringify(result))
      this.dialogRef.close();
      this.snackBar.open('Birthday changed', 'OK', {
        duration: 2000
      });
      window.location.reload();
    }, (result) => {
      //Logic for failed function
      console.log(result)
      this.snackBar.open(`Something went wrong. ${result}`, 'OK', {
        duration: 2000
      });
    });
  }
}
