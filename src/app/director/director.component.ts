/** Importing */
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
  /** Importing API Calls */
import { UserRegistrationService } from '../fetch-api-data.service'

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss']
})

/** This class used to call 'getDirector()' function from 'UserRegistrationService' */
export class DirectorComponent implements OnInit {
  /** Variables used in this class */
  director: any = localStorage.getItem('director');
  parsedDirector: any = JSON.parse(this.director)
  splittedDirectorName: any = this.parsedDirector.Name.split(" ")
  fetchedDirector: any;
  string: any;

  /** Declaring variables for components injected to this components */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<DirectorComponent>
  ) {}

  /** Running functions on initiating the component */
  ngOnInit(): void {
    this.generateCorrectURLPart();
    this.getDirector()
  }

  /** Replacing 'space' with '%20' in the URL */
  generateCorrectURLPart(): void {
    this.string = this.splittedDirectorName.join("%20")
  }

  /** calling 'getDirector()' from 'UserRegistrationService' and add the result to 
   * 'fetchedDirector' variable */
  getDirector(): void { 
    this.fetchApiData.getDirector(this.string).subscribe((result: any) => {
      this.fetchedDirector = result;
    }, (error: any) => {
      console.log(error)
    })
}}
