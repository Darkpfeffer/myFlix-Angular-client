/** Importing */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegistrationService } from '../fetch-api-data.service'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
  /** Importing Material */
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
  /** Importing self-made components*/
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

/** This component handles the information of the user */
export class UserProfilePageComponent implements OnInit {

  /** Declaring variables */
  userData: any = localStorage.getItem('user');
  parsedUserData = JSON.parse(this.userData);
  userBirthday = new Date(this.parsedUserData.Birthday).toLocaleDateString();
  storageMovies: any = localStorage.getItem('movies');
  movies = JSON.parse(this.storageMovies);
  userFavoritesID: any[] = this.parsedUserData.FavoriteMovies;
  userFavorites: any [] = [];

  /** Declaring variables for components injected to this components */
  constructor(
    public fetchData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router,
    private observer: BreakpointObserver
  ) {}

  /** Variables for styling */
  gridColumnSpan: Number = 12;
  gridRowSpan: Number = 24;

  /** Running functions on initiating the component */
  ngOnInit(): void {
    this.filterFavorites();

    /** Sets the resolution of the movie cards */
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

  /** This function keeps only the user's favorite movies from all movies */
  filterFavorites() : any[] {
    for(let i= 0; i < this.movies.length; i++) {
      if (this.userFavoritesID.includes(this.movies[i]._id)) {
        this.userFavorites.push(this.movies[i]);
      }
    }
    return this.userFavorites
  }

  /** Navigating to all movies when the 'Back to Movies' button is pressed */
  navigateToMovieList(): void{
    this.router.navigate(['movies']);
  }

  /** Opens change username modal */
  openChangeUsernameModal(): void {
    this.dialog.open(ChangeUsernameComponent)
  }

  /** Opens change password modal */
  openChangePasswordModal(): void {
    this.dialog.open(ChangePasswordComponent)
  }

  /** Opens change email modal */
  openChangeEmailModal(): void {
    this.dialog.open(ChangeEmailComponent)
  }

  /** Opens change birthday modal */
  openChangeBirthdayModal(): void {
    this.dialog.open(ChangeBirthdayComponent)
  }

  /** Opens delete account modal */
  openDeleteAccountModal(): void {
    this.dialog.open(DeleteAccountComponent)
  }

  /** Navigates back to 'Welcome' page when the 'Logout' button is pressed */
  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  /** 
   * This function removes the movie from the user's favorite list when the 'full heart'
   * button is pressed.
   */
  removeFromFavorites(userID: any, movieID: any): void {
    this.fetchData.removeMovieFromFavorite(userID, movieID)
      /** Logic at success of the function */
      .subscribe((result) => {
        this.snackBar.open('Removed from favorites', 'OK', {
          duration: 2000
        });
        localStorage.setItem('user', JSON.stringify(result.updatedUser));
        this.userFavoritesID = [];
        this.userFavorites = [];
        this.userFavoritesID = result.updatedUser.FavoriteMovies;
        this.filterFavorites();
      /** Logic at fail of the function */
      }, (result) => {
        this.snackBar.open('Something went wrong', 'OK', {
          duration: 2000
        })
    })
  }

  /** This function opens GenreComponent */
  openGenreModal(): void {
    this.dialog.open(GenreComponent)
  }

  currentGenre: any;
  /** This function uses the data of the genre where the 'Genre' button was pressed */
  setCurrentGenre(movie: any): void {
    this.currentGenre = movie.Genre
    localStorage.setItem('genre', JSON.stringify(this.currentGenre))
  }

  /** This function opens DirectorComponent */ 
  openDirectorModal(): void {
    this.dialog.open(DirectorComponent)
  }

  currentDirector: any;
  /** This function uses the current director where the 'Director' button was pressed */
  setCurrentDirector(movie: any): void {
    this.currentDirector = movie.Director;
    localStorage.setItem('director', JSON.stringify(this.currentDirector));
  }

  /** This function opens MovieSummaryComponent */
  openSummaryModal(): void {
    this.dialog.open(MovieSummaryComponent)
  }

  currentSummary: any;
  /** 
   * This function uses the current summary of the movie where the 'Summary' button 
   * was pressed 
   */
  setCurrentSummary(movie: any): void {
    this.currentSummary = movie.Description;
    localStorage.setItem('summary', JSON.stringify(this.currentSummary))
  }
}
