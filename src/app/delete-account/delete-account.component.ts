import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
  //To make API calls
import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent implements OnInit {
  user: any = localStorage.getItem('user');
  userID = JSON.parse(this.user)._id;

  constructor(
    public FetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<DeleteAccountComponent>,
    public snackBar: MatSnackBar,
    private router: Router
   ) { }

  ngOnInit(): void {
  }

  deleteAccount(): void {
    this.FetchApiData.deleteUser(this.userID).subscribe((result) => {
      console.log(result);
      this.dialogRef.close();
      this.snackBar.open('Account has been deleted.', 'OK', {
        duration: 2000
      });
      this.router.navigate(['welcome'])
    }, (result) => {
      //Logic for failed fuction
      this.dialogRef.close();
      this.snackBar.open('Account has been deleted.', 'OK', {
        duration: 2000
      });
      this.router.navigate(['welcome'])
    })
  }

  dontDeleteAccount(): void {
    this.dialogRef.close()
  }
}
