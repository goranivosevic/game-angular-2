import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class DataService {
   private resultBS = new BehaviorSubject<number>(0);
   results1 = this.resultBS.asObservable();

   constructor(private http: HttpClient) { }
   fetchData(){
      return this.http.get('/assets/podaci.json');
   }

  setResult(result: number) {
     
     
   this.resultBS.next(result);
  }

}
