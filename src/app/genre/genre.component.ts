/** Importing */
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
  /** Importing API calls */
import { UserRegistrationService } from '../fetch-api-data.service'

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})

/** This class used to call 'getGenre()' function */
export class GenreComponent implements OnInit {
  genre: any = localStorage.getItem('genre');
  parsedGenre: any = JSON.parse(this.genre);
  fetchedGenre: any;

  /** Declaring variables for components injected to this components */
  constructor( 
    public fetchApiData: UserRegistrationService, 
    public dialogRef: MatDialogRef<GenreComponent>
  ) { }

  /** Running functions on initiating the component */
  ngOnInit(): void {
    this.getGenre(this.parsedGenre.Name)
  }

  /** Function that calls 'getGenre()' function from 'UserRegistrationService' and adding result 
   * to the 'fetchedGenre' variable
   */
  getGenre(genre: string): void {
    this.fetchApiData.getGenre(genre).subscribe((result) => {
      this.fetchedGenre = result;
    }, (error) => {
      console.log(error)
    })
  }
}
