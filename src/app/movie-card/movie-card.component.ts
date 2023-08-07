//import
import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
  //Material
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
  //Self-made components
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { MovieSummaryComponent } from '../movie-summary/movie-summary.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {

  movies: any[] = [];
  userData: any = localStorage.getItem('user');
  parsedUserData = JSON.parse(this.userData);

  constructor(
    public fetchMovies: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router,
    private observer: BreakpointObserver
  ) { }

  //for styling
  gridColumnSpan: Number = 12;
  gridRowSpan: Number = 24;

  ngOnInit(): void {
    this.getMovies();
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

  storageMovies: any = localStorage.getItem('movies');
  parsedMovies = JSON.parse(this.storageMovies);
  userFavoritesID: any[] = this.parsedUserData.FavoriteMovies;
  userFavorites: any [] = [];
  currentGenre: any

  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((res: any) => {
      this.movies = res
      localStorage.setItem('movies', JSON.stringify(this.movies))
      return this.movies
    });
  }

  filterFavorites() : any[] {
    for(let i= 0; i < this.parsedMovies.length; i++) {
      if (this.userFavoritesID.includes(this.parsedMovies[i]._id)) {
        this.userFavorites.push(this.parsedMovies[i]);
      }
    }
    return this.userFavorites
  }

  navigateToProfile(): void {
    this.router.navigate(['profile'])
  }

  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  addToFavorites(userID: any, movieID: any): void {
    this.fetchMovies.addMovieToFavorite(userID, movieID)
      .subscribe((result) => {
        this.snackBar.open('Added to favorites', 'OK', {
          duration: 2000
        });
        localStorage.setItem('user', JSON.stringify(result))
        this.userFavoritesID = [];
        this.userFavorites = [];
        this.userFavoritesID = result.FavoriteMovies;
        this.filterFavorites();
      }, (result) => {
        this.snackBar.open('Something went wrong', 'OK', {
          duration: 2000
        })
      })
  }

  removeFromFavorites(userID: any, movieID: any): void {
    this.fetchMovies.removeMovieFromFavorite(userID, movieID).subscribe((result) => {
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

  setCurrentGenre(movie: any): void {
    this.currentGenre = movie.Genre;
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
