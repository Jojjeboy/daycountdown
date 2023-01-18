import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageServiceService {

  key = 'targetDate';
  constructor() {
    if (window.hasOwnProperty('localStorage')) {
      if (localStorage.getItem(this.key) === null) {
        localStorage.setItem(this.key, '2023-02-18');
      }
    } else {
      window.alert('Please considering upgrading browser to be able to use Localstorage');
    }
  }


  /*
  getDate(): Date {
    let dateString = localStorage.getItem(this.key); // 2023-02-18
    let dateArr = dateString?.split('-');
    return new Date(dateArr[0]?, dateArr[1], dateArr[2]);
  }
  */

  getDate(defaultDate: string): any {
    let lsValue:string = localStorage.getItem(this.key) || defaultDate;
    return new Date(lsValue);
  }

  saveDate(dateString: string): void {
    this.writeLS(dateString);
  }



  writeLS(value: string): void {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  clear() {
    localStorage.removeItem(this.key);
  }

 
}