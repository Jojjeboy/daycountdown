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
  difference: number;
  inputDate: Date;
  today = new Date;
  dateFormat = "EEEE d MMMM";
  //targetDate$ = of(formatDate(this.targetDate, this.dateFormat, this.locale));
  public nrOfDays: number = 0;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private localStorageService: LocalStorageServiceService
    
    ){}
  
  ngOnInit(): void {
      this.targetDate = this.getCountDownDate();
      this.nrOfDays = this.calculateDiffrence(this.targetDate);
  }

  @ViewChild('days', { static: true }) days: ElementRef;

  getCountDownDate() : Date {
    let targetDate: any = this.localStorageService.getDate(this.targetDateString);
    return targetDate;
  }

  calculateDiffrence(targetDate: Date) : number{
      // To calculate the time difference of two dates
      let Difference_In_Time = targetDate.getTime() - new Date().getTime();
      
      // To calculate the no. of days between two dates
      let Difference_In_Days = Math.ceil(Difference_In_Time / (1000 * 3600 * 24));
      return Difference_In_Days;
  }

  saveDate(value: any) {
    this.targetDate = new Date(value.inputDate);
    
    this.localStorageService.saveDate(value.inputDate);
    this.nrOfDays = this.calculateDiffrence(this.targetDate);
  }

}
