import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
  //Material
import { MatDialog } from '@angular/material/dialog';
  //Self-made components
import { ChangeUsernameComponent } from '../change-username/change-username.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ChangeEmailComponent } from '../change-email/change-email.component';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss']
})
export class UserProfilePageComponent implements OnInit {
  userData: any = localStorage.getItem('user');
  parsedUserData = JSON.parse(this.userData)
  userBirthday = new Date(this.parsedUserData.Birthday).toLocaleDateString();
  storageMovies: any = localStorage.getItem('movies');
  movies = JSON.parse(this.storageMovies);
  userFavoritesID: any[] = this.parsedUserData.FavoriteMovies;
  userFavorites: any [] = [];

  constructor(
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.filterFavorites();
  }

  filterFavorites() : any[] {
    for(let i= 0; i < this.movies.length; i++) {
      if (this.userFavoritesID.includes(this.movies[i]._id)) {
        this.userFavorites.push(this.movies[i]);
      }
    }
    return this.userFavorites
  }

  navigateToMovieList(): void{
    this.router.navigate(['movies']);
  }

  //Opens change username modal
  openChangeUsernameModal(): void {
    this.dialog.open(ChangeUsernameComponent)
  }

  //Opens change username modal
  openChangePasswordModal(): void {
    this.dialog.open(ChangePasswordComponent)
  }

  //Opens change username modal
  openChangeEmailModal(): void {
    this.dialog.open(ChangeEmailComponent)
  }
}
