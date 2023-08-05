import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
  //To make API calls
import { UserRegistrationService } from '../fetch-api-data.service'

@Component({
  selector: 'app-change-username',
  templateUrl: './change-username.component.html',
  styleUrls: ['./change-username.component.scss']
})
export class ChangeUsernameComponent implements OnInit {
  user: any = localStorage.getItem('user');
  parsedUser: any = JSON.parse(this.user)
  
  @Input () userData = { 
    Username: '', 
    Password: '', 
    Email: this.parsedUser.Email, 
    Birthday: this.parsedUser.Birthday
  }

  constructor(
    public FetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<ChangeUsernameComponent>,
    public snackBar: MatSnackBar,
    private router: Router
   ) { }

  ngOnInit(): void {
  }

  changeUsername(): void {
    this.FetchApiData.editUser(this.userData).subscribe((result) => {
      console.log(result);
      localStorage.setItem('user', JSON.stringify(result))
      this.dialogRef.close();
      this.snackBar.open('Username changed', 'OK', {
        duration: 2000
      });
      this.router.navigate(['welcome'])
    }, (result) => {
      //Logic for failed function
      this.snackBar.open(`Something went wrong. ${result}`, 'OK', {
        duration: 2000
      });
    });
  }
}
