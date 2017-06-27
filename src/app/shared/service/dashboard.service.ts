import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers, URLSearchParams} from '@angular/http'
import {Article} from '../models/article'
import 'rxjs/add/operator/toPromise';

import * as moment from 'moment'

@Injectable()
export class DashboardService {

  apiKey: string = '8e53f61c822246fc92eff0afaafcc24c';

  url: string = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';//?api-key=' + this.apiKey;

  constructor(private http: Http) { }

  test(): void {

    console.log('aaaa');
  }


  public getArticles(begin: string, end: string): Promise<Article[]> {

    var beginDate = this.convertToValidDateString(begin);
    var endDate = this.convertToValidDateString(end);

    try {
      if(beginDate != null && endDate != null && !this.checkIfTimeIntervalIsValid(begin, end)) {
        throw new Error('Time interval is invalid');
      }
    }
    catch(error) {
      return Promise.reject(error.message || error);
    }

    let params: URLSearchParams = new URLSearchParams();
    params.set('api-key', this.apiKey);


    if(beginDate != null) {
      params.set('begin_date', beginDate);
    }
    if(endDate != null) {
      params.set('end_date', endDate);
    }

    return this.http.get(this.url, {
      search: params
    })
      .toPromise()
      .then(response => {
        if(response.status != 200) {
          throw new Error('The request has failed');
        }
        else {
          return response.json()
        }
      })
      .then(response => {
        return response.response.docs as Article[];
      })
      .catch(this.handleError)



  }

  private handleError(error: any): Promise<any> {
    //console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private convertToValidDateString(dateString: string): string {

    if(moment(dateString).isValid()) {
      return moment(dateString).format('YYYYMMDD');
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
      return false;
    }
  }



}
