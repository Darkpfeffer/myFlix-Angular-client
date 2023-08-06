import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
  //To make API calls
import { UserRegistrationService } from '../fetch-api-data.service'

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
  genre: any = localStorage.getItem('genre');
  parsedGenre: any = JSON.parse(this.genre);
  fetchedGenre: any;
  constructor( 
    public fetchApiData: UserRegistrationService, 
    public dialogRef: MatDialogRef<GenreComponent>
  ) { }

  ngOnInit(): void {
    this.getGenre(this.parsedGenre.Name)
  }

  getGenre(genre: string): void {
    this.fetchApiData.getGenre(genre).subscribe((result) => {
      this.fetchedGenre = result;
    }, (error) => {
      console.log(error)
    })
  }
}
