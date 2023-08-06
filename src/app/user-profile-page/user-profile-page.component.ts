import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegistrationService } from '../fetch-api-data.service'
  //Material
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
  //Self-made components
import { ChangeUsernameComponent } from '../change-username/change-username.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ChangeEmailComponent } from '../change-email/change-email.component';
import { ChangeBirthdayComponent } from '../change-birthday/change-birthday.component';
import { DeleteAccountComponent } from '../delete-account/delete-account.component';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { MovieSummaryComponent } from '../movie-summary/movie-summary.component';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss']
})
export class UserProfilePageComponent implements OnInit {
  userData: any = localStorage.getItem('user');
  parsedUserData = JSON.parse(this.userData);
  userBirthday = new Date(this.parsedUserData.Birthday).toLocaleDateString();
  storageMovies: any = localStorage.getItem('movies');
  movies = JSON.parse(this.storageMovies);
  userFavoritesID: any[] = this.parsedUserData.FavoriteMovies;
  userFavorites: any [] = [];

  constructor(
    public fetchData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
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

  //Opens change password modal
  openChangePasswordModal(): void {
    this.dialog.open(ChangePasswordComponent)
  }

  //Opens change email modal
  openChangeEmailModal(): void {
    this.dialog.open(ChangeEmailComponent)
  }

  //Opens change birthday modal
  openChangeBirthdayModal(): void {
    this.dialog.open(ChangeBirthdayComponent)
  }

  //Opens delete account modal
  openDeleteAccountModal(): void {
    this.dialog.open(DeleteAccountComponent)
  }

  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  removeFromFavorites(userID: any, movieID: any): void {
    this.fetchData.removeMovieFromFavorite(userID, movieID).subscribe((result) => {
      this.snackBar.open('Removed from favorites', 'OK', {
        duration: 2000
      });
      localStorage.setItem('user', JSON.stringify(result.updatedUser));
      this.userFavoritesID = [];
      this.userFavorites = [];
      this.userFavoritesID = result.updatedUser.FavoriteMovies;
      this.filterFavorites();
    }, (result) => {
      this.snackBar.open('Something went wrong', 'OK', {
        duration: 2000
      })
    })
  }

  //Functions for GenreComponent
  openGenreModal(): void {
    this.dialog.open(GenreComponent)
  }

  currentGenre: any;
  setCurrentGenre(movie: any): void {
    this.currentGenre = movie.Genre
    localStorage.setItem('genre', JSON.stringify(this.currentGenre))
  }

  //Functions for DirectorComponent
  openDirectorModal(): void {
    this.dialog.open(DirectorComponent)
  }

  currentDirector: any;
  setCurrentDirector(movie: any): void {
    this.currentDirector = movie.Director;
    console.log(this.currentDirector)
    localStorage.setItem('director', JSON.stringify(this.currentDirector));
  }

  //Functions for MovieSummaryComponent
  openSummaryModal(): void {
    this.dialog.open(MovieSummaryComponent)
  }

  currentSummary: any;
  setCurrentSummary(movie: any): void {
    this.currentSummary = movie.Description;
    localStorage.setItem('summary', JSON.stringify(this.currentSummary))
  }
}
