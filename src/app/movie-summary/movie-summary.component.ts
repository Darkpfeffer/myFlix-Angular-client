import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-summary',
  templateUrl: './movie-summary.component.html',
  styleUrls: ['./movie-summary.component.scss']
})

export class MovieSummaryComponent implements OnInit {
  summary: any = localStorage.getItem('summary')
  parsedSummary: any = JSON.parse(this.summary)
  
  constructor(
    public dialogRef: MatDialogRef<MovieSummaryComponent>
  ) {}

  ngOnInit(): void {
    
  }
}
