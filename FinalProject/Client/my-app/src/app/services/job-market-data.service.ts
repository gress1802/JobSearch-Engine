import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobMarketDataService {

  constructor( private http : HttpClient ) { }

  fetchSalaryData(series: string) : Observable<any> {
    return this.http.get(`/api/v1/salaries/data/?series=${series}`);
  }

  fetchProjectionsData(series: string) : Observable<any> {
    return this.http.get(`/api/v1/projections/data/?series=${series}`);
  }
}
