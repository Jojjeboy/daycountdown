import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { formatDate } from "@angular/common";
import { LOCALE_ID, Inject } from "@angular/core";
import { of } from "rxjs";
import { LocalStorageServiceService } from './local-storage-service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  date: any;
  now: any;
  targetDateString = '2023-02-18';
  targetDate: any = new Date(this.targetDateString);
  targetTime: any = this.targetDate.getTime();
  difference: number;
  inputDate: string;
  today = new Date;
  dateFormat = "EEEE d MMMM";
  targetDate$ = of(formatDate(this.targetDate, this.dateFormat, this.locale));
  public nrOfDays: number = 0;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private localStorageService: LocalStorageServiceService
    
    ){}
  
  ngOnInit(): void {
      const targetDate = this.getCountDownDate();
      this.nrOfDays = this.calculateDiffrence(targetDate);
  }

  @ViewChild('days', { static: true }) days: ElementRef;



  /* PÅ OnInit Hämta datum från en funktion som kan köras LS
      Finns inte datumet, ta ett default date sparat här
      Spara dagens datum i en variablel
      Räkna ut skillnaden i datum
      Visa upp skillnaden i vyn.

  */




  getCountDownDate() : Date {
    let targetDate: any = this.localStorageService.getDate(this.targetDateString);
    return targetDate;
  }

  calculateDiffrence(targetDate: Date) : number{
      // To calculate the time difference of two dates
      let Difference_In_Time = targetDate.getTime() - new Date().getTime();
      
      // To calculate the no. of days between two dates
      let Difference_In_Days = Math.ceil(Difference_In_Time / (1000 * 3600 * 24));

      Difference_In_Days = isNaN(Difference_In_Days) ? 0 : Difference_In_Days;
      return Difference_In_Days;
  }

  saveDate(value: any) {
    console.log(value);
    this.targetDate = new Date(value.inputDate);
    this.targetTime = new Date(value.inputDate).getTime();
    
    this.localStorageService.saveDate(value.inputDate);
    this.nrOfDays = this.calculateDiffrence(this.targetDate);
  }

}
