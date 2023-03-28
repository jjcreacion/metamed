import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs'; // For rxjs 6
//import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class MyEventService {

  private selectedLanguage = new Subject<string>();

  constructor() { }

  public getLanguageObservable(): Observable<string> {
      return this.selectedLanguage.asObservable();
  }

  public setLanguageData(data) {
      this.selectedLanguage.next(data);
  }
}
