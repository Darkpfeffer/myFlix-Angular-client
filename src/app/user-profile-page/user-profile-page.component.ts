import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'

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

  ngOnInit(): void {
    this.filterFavorites();
    this.log();
  }

  log() {
    console.log(this.userFavorites)
    console.log(this.userFavoritesID)
    console.log(this.movies)
  }

  filterFavorites() : any[] {
    for(let i= 0; i < this.movies.length; i++) {
      if (this.userFavoritesID.includes(this.movies[i]._id)) {
        this.userFavorites.push(this.movies[i]);
      }
    }
    return this.userFavorites
  }
}
