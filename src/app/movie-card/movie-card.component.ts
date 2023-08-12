/** Importing */
import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
/** Importing Material */
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
/** Importing self-made components */
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { MovieSummaryComponent } from '../movie-summary/movie-summary.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

/** This class handles the movies from the database */
export class MovieCardComponent implements OnInit {

  /** Declaring variables */
  movies: any[] = [];
  userData: any = localStorage.getItem('user');
  parsedUserData = JSON.parse(this.userData);

  /** Declaring variables for components injected to this components */
  constructor(
    public fetchMovies: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router,
    private observer: BreakpointObserver
  ) { }

  /** Variables for styling */
  gridColumnSpan: Number = 12;
  gridRowSpan: Number = 24;

  /** Running functions on initiating the component */
  ngOnInit(): void {
    this.getMovies();
    this.filterFavorites();

    /** Sets the resolution of the movie cards */
    this.observer.observe(Breakpoints.XSmall).subscribe((result) => {
      if (result.matches) {
        this.gridColumnSpan = 12;
        this.gridRowSpan = 12;
      }
    })

    this.observer.observe('(min-width: 461px)').subscribe((result) => {
      if (result.matches) {
        this.gridColumnSpan = 12;
        this.gridRowSpan = 12;
      }
    })

    this.observer.observe('(min-width: 381px) and (max-width: 460px)').subscribe((result) => {
      if (result.matches) {
        this.gridColumnSpan = 12;
        this.gridRowSpan = 15;
      }
    })

    this.observer.observe('(min-width: 301px) and (max-width: 380px)').subscribe((result) => {
      if (result.matches) {
        this.gridColumnSpan = 12;
        this.gridRowSpan = 20;
      }
    })

    this.observer.observe('(min-width: 251px) and (max-width: 300px)').subscribe((result) => {
      if (result.matches) {
        this.gridColumnSpan = 12;
        this.gridRowSpan = 24;
      }
    })

    this.observer.observe('(max-width: 250px)').subscribe((result) => {
      if (result.matches) {
        this.gridColumnSpan = 12;
        this.gridRowSpan = 30;
      }
    })

    this.observer.observe(Breakpoints.Small).subscribe(result => {
      if (result.matches) {
        this.gridColumnSpan = 6;
        this.gridRowSpan = 7;
      }
    })

    this.observer.observe('(min-width: 781px)').subscribe((result) => {
      if (result.matches) {
        this.gridColumnSpan = 6;
        this.gridRowSpan = 7;
      }
    })

    this.observer.observe('(min-width: 600px) and (max-width: 780px)').subscribe((result) => {
      if (result.matches) {
        this.gridColumnSpan = 6;
        this.gridRowSpan = 10;
      }
    })

    this.observer.observe(Breakpoints.Medium).subscribe(result => {
      if (result.matches) {
        this.gridColumnSpan = 4;
        this.gridRowSpan = 5;
      }
    })

    this.observer.observe('(min-width: 1151px)').subscribe(result => {
      if (result.matches) {
        this.gridColumnSpan = 4;
        this.gridRowSpan = 5;
      }
    })

    this.observer.observe('(min-width: 960px) and (max-width: 1150px)').subscribe(result => {
      if (result.matches) {
        this.gridColumnSpan = 4;
        this.gridRowSpan = 7;
      }
    })

    this.observer.observe(Breakpoints.Large).subscribe(result => {
      if (result.matches) {
        this.gridColumnSpan = 3;
        this.gridRowSpan = 3;
      }
    })

    this.observer.observe('(min-width: 1401px) and (max-width: 1770px)').subscribe(result => {
      if (result.matches) {
        this.gridColumnSpan = 3;
        this.gridRowSpan = 4;
      }
    })

    this.observer.observe('(min-width: 1280px) and (max-width: 1400px)').subscribe(result => {
      if (result.matches) {
        this.gridColumnSpan = 3;
        this.gridRowSpan = 5;
      }
    })

    this.observer.observe(Breakpoints.XLarge).subscribe(result => {
      if (result.matches) {
        this.gridColumnSpan = 2;
        this.gridRowSpan = 3;
      }
    })
  }

  storageMovies: any = localStorage.getItem('movies');
  parsedMovies = JSON.parse(this.storageMovies);
  userFavoritesID: any[] = this.parsedUserData.FavoriteMovies;
  userFavorites: any[] = [];
  currentGenre: any

  /** This function fetches the movies */
  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((res: any) => {
      this.movies = res
      localStorage.setItem('movies', JSON.stringify(this.movies))
      return this.movies
    });
  }

  /** This function keeps only the user's favorite movies from all movies */
  filterFavorites(): any[] {
    for (let i = 0; i < this.parsedMovies.length; i++) {
      if (this.userFavoritesID.includes(this.parsedMovies[i]._id)) {
        this.userFavorites.push(this.parsedMovies[i]);
      }
    }
    return this.userFavorites
  }

  /** Navigates to Profile when the 'Profile' button is pressed */
  navigateToProfile(): void {
    this.router.navigate(['profile'])
  }

  /** Navigates back to 'Welcome' page when the 'Logout' button is pressed */
  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  /** 
   * This function adds the movie to the user's favorite list when the 'empty heart' 
   * button is pressed.
   */
  addToFavorites(userID: any, movieID: any): void {
    this.fetchMovies.addMovieToFavorite(userID, movieID)
      /** Logic at success of the function */
      .subscribe((result) => {
        this.snackBar.open('Added to favorites', 'OK', {
          duration: 2000
        });
        localStorage.setItem('user', JSON.stringify(result))
        this.userFavoritesID = [];
        this.userFavorites = [];
        this.userFavoritesID = result.FavoriteMovies;
        this.filterFavorites();
      /** Logic at fail of the function */
      }, (result) => {
        this.snackBar.open('Something went wrong', 'OK', {
          duration: 2000
        })
      })
  }

  /** 
   * This function removes the movie from the user's favorite list when the 'full heart'
   * button is pressed.
   */
  removeFromFavorites(userID: any, movieID: any): void {
    this.fetchMovies.removeMovieFromFavorite(userID, movieID)
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

  /** This function uses the data of the genre where the 'Genre' button was pressed */
  setCurrentGenre(movie: any): void {
    this.currentGenre = movie.Genre;
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
    console.log(this.currentDirector)
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
