import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers, URLSearchParams} from '@angular/http'
import {Article} from '../models/article'
import 'rxjs/add/operator/catch';
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";
import {Observable} from 'rxjs/Observable';
import * as moment from 'moment'

@Injectable()
export class DashboardService {

  private apiKey: string = '8e53f61c822246fc92eff0afaafcc24c';

  private url: string = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';

  constructor(private http: Http) { }



  public getArticles(begin: string, end: string): Observable<any> {


    //convert to YYYYMMDD
    try {
      var beginDate = this.convertToValidDateString(begin);
      var endDate = this.convertToValidDateString(end);
    }
    catch(error) {
      return Observable.throw(error.message);//invalid format
    }

    //check time interval


    try {
      if(beginDate != null && endDate != null) {
        this.checkIfTimeIntervalIsValid(begin, end);
      }
    }
    catch(error) {
      return Observable.throw(error.message); //invalid time interval
    }


    //set get params
    let params: URLSearchParams = new URLSearchParams();
    params.set('api-key', this.apiKey);

    if(beginDate != null) {
      params.set('begin_date', beginDate);
    }
    if(endDate != null) {
      params.set('end_date', endDate);
    }




    //make request
    return this.http.get(this.url, {
      search: params
    })
      .map(res => res.json())
      .catch(this.handleError)


  }


  private handleError() {
    return Observable.throw('Request failed');
  }



  private convertToValidDateString(dateString: string): string {
    if(dateString != '') {
      if(moment(dateString).isValid()) {
        return moment(dateString).format('YYYYMMDD');
      }
      else {
        throw new Error('Invalid date format');
      }
    }
    else {
      return null;
    }


  }



  private checkIfTimeIntervalIsValid(begin: string, end: string): boolean {
    if(moment(end).diff(moment(begin), 'days') >= 0) {
      return true;
    }
    else {
      throw new Error('Invalid time interval');
    }
  }




}
