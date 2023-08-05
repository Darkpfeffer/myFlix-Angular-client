import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
  //To make API calls
import { UserRegistrationService } from '../fetch-api-data.service'

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent implements OnInit {
  user: any = localStorage.getItem('user');
  parsedUser: any = JSON.parse(this.user)
  
  @Input () userData = { 
    Username: this.parsedUser.Username, 
    Password: '', 
    Email: '', 
    Birthday: this.parsedUser.Birthday
  }

  constructor(
    public FetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<ChangeEmailComponent>,
    public snackBar: MatSnackBar
   ) { }

  ngOnInit(): void {
  }

  changeEmail(): void {
    this.FetchApiData.editUser(this.userData).subscribe((result) => {
      console.log(result);
      localStorage.setItem('user', JSON.stringify(result))
      this.dialogRef.close();
      this.snackBar.open('Email changed', 'OK', {
        duration: 2000
      });
      window.location.reload();
    }, (result) => {
      //Logic for failed function
      this.snackBar.open(`Something went wrong. ${result}`, 'OK', {
        duration: 2000
      });
    });
  }
}
