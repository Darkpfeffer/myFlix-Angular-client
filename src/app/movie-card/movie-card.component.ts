import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {

  movies: any[] = []

  constructor(public fetchMovies: UserRegistrationService) { }

ngOnInit(): void {
  this.getMovies();
}

getMovies(): void {
  this.fetchMovies.getAllMovies().subscribe(( res: any) => {
    this.movies = res
    console.log(this.movies);
    localStorage.setItem('movies', JSON.stringify(this.movies))
    return this.movies
  });
}
}
