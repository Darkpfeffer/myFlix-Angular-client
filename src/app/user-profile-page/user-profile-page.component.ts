import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegistrationService } from '../fetch-api-data.service'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
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
    private router: Router,
    private observer: BreakpointObserver
  ) {}

  //for styling
  gridColumnSpan: Number = 12;
  gridRowSpan: Number = 24;

  ngOnInit(): void {
    this.filterFavorites();

    this.observer.observe(Breakpoints.XSmall).subscribe((result) => {
      if(result.matches) {
        this.gridColumnSpan = 12;
        this.gridRowSpan = 12;
      }
    })

    this.observer.observe('(min-width: 461px)').subscribe((result) => {
      if(result.matches) {
        this.gridColumnSpan = 12;
        this.gridRowSpan = 12;
      }
    })

    this.observer.observe('(min-width: 381px) and (max-width: 460px)').subscribe((result) => {
      if(result.matches) {
        this.gridColumnSpan = 12;
        this.gridRowSpan = 15;
      }
    })

    this.observer.observe('(min-width: 301px) and (max-width: 380px)').subscribe((result) => {
      if(result.matches) {
        this.gridColumnSpan = 12;
        this.gridRowSpan = 20;
      }
    })

    this.observer.observe('(min-width: 251px) and (max-width: 300px)').subscribe((result) => {
      if(result.matches) {
        this.gridColumnSpan = 12;
        this.gridRowSpan = 24;
      }
    })

    this.observer.observe('(max-width: 250px)').subscribe((result) => {
      if(result.matches) {
        this.gridColumnSpan = 12;
        this.gridRowSpan = 30;
      }
    })

    this.observer.observe(Breakpoints.Small).subscribe(result => {
      if(result.matches) {
        this.gridColumnSpan = 6;
        this.gridRowSpan = 7;
      }
    })

    this.observer.observe('(min-width: 781px)').subscribe((result) => {
      if(result.matches) {
        this.gridColumnSpan = 6;
        this.gridRowSpan = 7;
      }
    })

    this.observer.observe('(min-width: 600px) and (max-width: 780px)').subscribe((result) => {
      if(result.matches) {
        this.gridColumnSpan = 6;
        this.gridRowSpan= 10;
      }
    })

    this.observer.observe(Breakpoints.Medium).subscribe(result => {
      if(result.matches) {
        this.gridColumnSpan = 4;
        this.gridRowSpan = 5;
      }
    })

    this.observer.observe('(min-width: 1151px)').subscribe(result => {
      if(result.matches) {
        this.gridColumnSpan = 4;
        this.gridRowSpan = 5;
      }
    })

    this.observer.observe('(min-width: 960px) and (max-width: 1150px)').subscribe(result => {
      if(result.matches) {
        this.gridColumnSpan = 4;
        this.gridRowSpan = 7;
      }
    })  

    this.observer.observe(Breakpoints.Large).subscribe(result => {
      if(result.matches) {
        this.gridColumnSpan = 3;
        this.gridRowSpan = 3;
      }
    })

    this.observer.observe('(min-width: 1401px) and (max-width: 1770px)').subscribe(result => {
      if(result.matches) {
        this.gridColumnSpan = 3;
        this.gridRowSpan = 4;
      }
    })

    this.observer.observe('(min-width: 1280px) and (max-width: 1400px)').subscribe(result => {
      if(result.matches) {
        this.gridColumnSpan = 3;
        this.gridRowSpan = 5;
      }
    })  

    this.observer.observe(Breakpoints.XLarge).subscribe(result => {
      if(result.matches) {
        this.gridColumnSpan = 2;
        this.gridRowSpan = 3;
      }
    })
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
