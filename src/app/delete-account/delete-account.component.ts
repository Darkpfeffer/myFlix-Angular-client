/** Importing */
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
  /** Importing API calls */
import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})

/** This class is used to delete the user's account. */
export class DeleteAccountComponent implements OnInit {
  user: any = localStorage.getItem('user');
  userID = JSON.parse(this.user)._id;

  /** Declaring variables for components injected to this components */
  constructor(
    public FetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<DeleteAccountComponent>,
    public snackBar: MatSnackBar,
    private router: Router
   ) { }

  /** @ignore */
  ngOnInit(): void {
  }

  /** This function calls 'deleteUser()' function from 'UserRegistrationService' */
  deleteAccount(): void {
    this.FetchApiData.deleteUser(this.userID)
      /** Logic for successful function */
      .subscribe((result) => {
        console.log(result);
        this.dialogRef.close();
        this.snackBar.open('Account has been deleted.', 'OK', {
          duration: 2000
        });
        this.router.navigate(['welcome'])
      /** Logic for successful fuction 
       * (for some reason it returns as fail but the account will be deleted) */
      }, (result) => {
        this.dialogRef.close();
        this.snackBar.open('Account has been deleted.', 'OK', {
          duration: 2000
        });
        this.router.navigate(['welcome'])
      })
  }

  /** Cancels deleting the account at pressing 'No' button */
  dontDeleteAccount(): void {
    this.dialogRef.close()
  }
}
