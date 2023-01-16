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
export class AppComponent implements AfterViewInit, OnInit {
  
  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private localStorageService: LocalStorageServiceService) {};

  date: any;
  now: any;
  defaultDateString: string = '2023-02-18';
  targetDate: any = this.localStorageService.getDate(this.defaultDateString);
  targetTime: any = this.localStorageService.getDate(this.defaultDateString).getTime();
  difference: number;
  inputDate: string;
  dateFormat = "dd MMMM";
  targetDate$ = of(formatDate(this.targetDate, this.dateFormat, this.locale));

  @ViewChild('dagar', { static: true }) days: ElementRef;
  @ViewChild('timmar', { static: true }) hours: ElementRef;

  ngOnInit(){
    this.getDate();
  }

  ngAfterViewInit() {
    setInterval(() => {
      this.tickTock();
      this.difference = this.targetTime - this.now;
      this.difference = this.difference / (1000 * 60 * 60 * 24);

      !isNaN(this.days.nativeElement.innerText)
        ? (this.days.nativeElement.innerText = Math.floor(this.difference))
        : (this.days.nativeElement.innerHTML = `...>`);
    }, 1);
  }


  public getDate() {
    this.targetDate = this.localStorageService.getDate(this.defaultDateString);
    
  }

  saveDate(value: any) {
    console.log(value);
    this.targetDate = new Date(value.inputDate);
    this.targetTime = new Date(value.inputDate).getTime();
    
    this.localStorageService.saveDate(value.inputDate);
    this.tickTock();
    
  }

  tickTock() {
    this.date = new Date();
    this.now = this.date.getTime();
    this.days.nativeElement.innerText = Math.floor(this.difference);
    this.hours.nativeElement.innerText = 23 - this.date.getHours();
  }
}
