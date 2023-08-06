//import
import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'
import { Router } from '@angular/router';
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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.filterFavorites();
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
