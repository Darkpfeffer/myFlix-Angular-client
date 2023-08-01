//import
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators/catchError';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'
import { map } from 'rxjs/operators'

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflix-5sws.onrender.com/'

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class
  // via this.http
  constructor(private http: HttpClient) {
  }
  //Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', {
      body: JSON.stringify(userDetails)
    }).pipe(
      catchError(this.handleError)
    );
  }

  //Making an API request to user login
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(userDetails)
    }).pipe(
      catchError(this.handleError)
    )
  }

  //making a request to get all movies
  public getAllMovies() : Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //Making an API request for a specific movie by title
  public getSpecificMovie(movieTitle: string) : Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + movieTitle, {
      headers: new HttpHeaders({
        Authorization: 'Bearer' + token
      }),
      observe: 'body'
    }).pipe(
      catchError(this.handleError)
    )
  }

  //Making an API request for a specific director by name
  public getDirector(directorName: string) : Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/directors/' + directorName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer' + token
      }),
      observe: 'body'
    }).pipe(
      catchError(this.handleError)
    )
  }

  //Making an API request for a specific genre by name
  public getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/' + genreName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer' + token
      }),
      observe: 'body'
    }).pipe(
      catchError(this.handleError)
    )
  }

  //Making an API request to add a movie to the users favourite list
  public addMovieToFavorite(userID: string, movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/' + userID + '/movies/' + movieID, {
      headers : new HttpHeaders ({
        Authorization: 'Bearer' + token
      }),
      observe: 'body'
    }).pipe(
      catchError(this.handleError)
    )
  }

  //Making an API request to edit user's information
  public editUser(username: string, password: string,
     email: string, birthday: Date): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.put(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer' + token
        }),
        body: JSON.stringify({
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday
        }),
        observe: 'body'
      }).pipe(
        catchError(this.handleError)
      )
  }

  //Making an API request to remove a movie from the favorite movies
  public removeMovieFromFavorite(userID: string, movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + userID + '/movies/' + movieID, {
      headers: new HttpHeaders({
        Authorization: 'Bearer' + token
      }),
      observe: 'body'
    }).pipe(
      catchError(this.handleError)
    )
  }

  //Making an API request to delete user
  public deleteUser(userID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + userID, {
      headers: new HttpHeaders({
        Authorization: 'Bearer' + token
      })
    }).pipe(
      catchError(this.handleError)
    )
  }
  
  //Non-typed resopnse extraction
  private extractResponseData(res: Response): any {
    const body = res;
    return body || { }
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured: ', error.error.message)
    } else {
      console.error(
        `Error Status code ${error.status}` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(() => {
    'Something bad happened; please try again later.'
    })
  }
}
