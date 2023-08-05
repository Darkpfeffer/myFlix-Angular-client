import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'
import { Router } from '@angular/router';

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

  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((res: any) => {
      this.movies = res
      console.log(this.movies);
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
    console.log(this.userFavorites)
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

  addFavorites(): void {}
}
