//import
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators/catchError';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'
import { map } from 'rxjs/operators'

/** 
 * Declaring the api url that will provide data for the client app 
 */
const apiUrl = 'https://myflix-5sws.onrender.com/'

@Injectable({
  providedIn: 'root'
})

/**
 * This class contains all the API requests will be made.
 */

export class UserRegistrationService {
  /**  Inject the HttpClient module to the constructor params.
   * 
   * This will provide HttpClient to the entire class via this.http.
   */
  constructor(private http: HttpClient) {
  }
  /** 
   * This function makes the api call for the user registration endpoint.
   * @param userDetails Expected request body (JSON):
   * 
   * {
   * 
   *     "Username": String, (required, minimum five characters long)
   * 
   *     "Password": String, (required)
   * 
   *     "Email": String, (required)
   * 
   *     "Birthday": Date (required)
   * 
   * }
   * 
   * @returns Returns JSON
   * 
   * @example Response:
   * 
   * {
   *    "Username": username,
   *    "Password": hashedPassword,
   *    "Email": email,
   *    "Birthday": birthday,
   *    "FavoriteMovies": [favoriteMovie._id],
   *    "_id": id
   * }
   */
  userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }
  /**
   * This function makes an API request to user login
   * @param userDetails Expected request body (JSON):
   * 
   * {
   * 
   *    "Username": String,
   * 
   *    "Password": String
   * 
   * }
   * 
   * @returns Returns JSON
   * @example Response
   * 
   * {
   *  "user": { 
   *    "_id": String, 
   *    "Username": String,
   *    "Password": String,
   *    "Email": String, 
   *    "Birthday": Date, 
   *    "FavoriteMovies": ["_id", "_id"]
   * },
   * "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEzMDlkYmQzZDZhYmU4MTRjNzZhMWMiLCJVc2VybmFtZSI6Ik1hcnkiLCJQYXNzd29yZCI6ImV4YW1wbGU0NTYhIiwiRW1haWwiOiJtYXJ5QGV4YW1wbGUuY29tIiwiQmlydGhkYXkiOiIyMDAxLTEwLTI0VDAwOjAwOjAwLjAwMFoiLCJGYXZvcml0ZU1vdmllcyI6W10sIl9fdiI6MCwiaWF0IjoxNjc5NDc3OTYxLCJleHAiOjE2ODAwODI3NjEsInN1YiI6Ik1hcnkifQ.B82SgvK_MCxE3QENmiVU4E9YZpipc_uHkBUDDmH1hjQ"
   * }
   */
  userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(this.handleError)
    )
  }

  /**
   * This function makes a request to get all movies
   * 
   * @example Response
   * 
   * [
   *  {
   *    movieData
   *  },
   *  {  
   *    movieData   
   *  },
   *  ...
   * ]
   */
  getAllMovies() : Observable<any> {
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

  /**
   * This function makes an API request for a specific movie by title
   * @param movieTitle
   * 
   * @example Response
   * [ 
   *  { 
   *    "Genre": { 
   *      "Name": String, 
   *      "Description": String
   *    },
   *    "Director": { 
   *      "Name": String, 
   *      "Bio": String,
   *      "Birthyear": Number 
   *    },
   *    "Actors": [],
   *    "_id": String,
   *    "Title": String,
   *    "Description": String,
   *    "Release_date": Number, 
   *    "ImageURL": Link
   *   } 
   * ]
   */
  getSpecificMovie(movieTitle: string) : Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + movieTitle, {
      headers: new HttpHeaders({
        Authorization: 'Bearer' + token
      })
    }).pipe(
      catchError(this.handleError)
    )
  }

  /** This function makes an API request for a specific director by name
   * @param directorName
   * 
   * @example Response
   * { 
   *  "Name": String, 
   *  "Bio": String, 
   *  "Birthyear": Number 
   * }
  */
  getDirector(directorName: string) : Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/directors/' + directorName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      catchError(this.handleError)
    )
  }

  /** This function makes an API request for a specific genre by name
   * @param genreName
   * 
   * @example Response
   * { 
   *  "Name": String, 
   *  "Description": String
   * }
  */
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/' + genreName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      catchError(this.handleError)
    )
  }

  /** This function makes an API request to add a movie to the users favourite list
   * @param userID
   * @param movieID
   * 
   * @example Response
   * { 
   *    "Username": String, 
   *    "Password": String, 
   *    "Email": String, 
   *    "Birthday": Date, 
   *    "FavoriteMovies": [String, String], 
   *    "_id": String
   * }
  */
  addMovieToFavorite(userID: string, movieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    let HttpHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    }) 
    return this.http.post(apiUrl + 'users/' + userID + '/movies/' + movieID, '', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      catchError(this.handleError)
    )
  }

  /**
   * This function makes an API request to edit user's information
   * @param userData 
   * 
   * Expected format in the request body: JSON
   * {
   * 
   *    "Username": String, (required)
   * 
   *    "Password": String, (required)
   * 
   *    "Email": String, (required)
   * 
   *    "Birthday": Date (required)
   * 
   * }
   * 
   * @example Response
   * { 
   *  "_id": String, 
   *  "Username": String, 
   *  "Password": String, 
   *  "Email": String, 
   *  "Birthday": Date, 
   *  "FavoriteMovies": []
   * }
   */
  editUser(userData: any): Observable<any> {
      const token = localStorage.getItem('token');
      const user: any = localStorage.getItem('user');
      const Username = JSON.parse(user).Username;
      return this.http.put(apiUrl + 'users/' + Username, userData, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      }).pipe(
        catchError(this.handleError)
      )
  }

  /** 
   * The function makes an API request to remove a movie from the favorite movies
   * @param userID
   * @param movieID
   * 
   * @example Response
   *  { 
   *    "updatedUser": 
   *      { 
   *        "Username": String, 
   *        "Password": String, 
   *        "Email": String, 
   *        "Birthday": Date, 
   *        "FavoriteMovies": [], 
   *        "_id": String
   *      } 
   *  }
  */
  removeMovieFromFavorite(userID: string, movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + userID + '/movies/' + movieID, '', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      catchError(this.handleError)
    )
  }

  /**
   * This function makes an API request to delete user
   * @param userID
   * 
   * @example Response
   * user 64130ea893504592c757550f has been deleted
   */
  deleteUser(userID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + userID, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      catchError(this.handleError)
    )
  }
  
  //Non-typed response extraction
  private extractResponseData(res: any): any {
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
