import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../shared/service/dashboard.service'
import {Article} from '../shared/models/article'

import {IMyDpOptions} from 'mydatepicker';
import * as moment from 'moment'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService: DashboardService) { }

  private articles: Article[];


  private beginDate: Object = {formatted: null};
  private endDate: Object = {formatted: null};



  ngOnInit() {
    this.getArticles();
  }


  public getArticles(): void {

    this.dashboardService.getArticles(this.beginDate['formatted'], this.endDate['formatted'])
      .then(response => this.articles = response);
  }


  public getFormattedDate(dateString: string): string {


    return moment.utc(dateString).format('YYYY-MM-DD, HH:mm');


  }



  private myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'yyyy-mm-dd',
  };





}
