import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
  //To make API calls
import { UserRegistrationService } from '../fetch-api-data.service'

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss']
})
export class DirectorComponent implements OnInit {
  director: any = localStorage.getItem('director');
  parsedDirector: any = JSON.parse(this.director)
  splittedDirectorName: any = this.parsedDirector.Name.split(" ")
  fetchedDirector: any;
  string: any;

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<DirectorComponent>
  ) {}

  ngOnInit(): void {
    this.generateCorrectURLPart();
    this.getDirector()
  }

  generateCorrectURLPart(): void {
    this.string = this.splittedDirectorName.join("%20")
  }

  getDirector(): void { 
    this.fetchApiData.getDirector(this.string).subscribe((result: any) => {
      console.log(result)
      this.fetchedDirector = result;
    }, (error: any) => {
      console.log(error)
    })
}}
