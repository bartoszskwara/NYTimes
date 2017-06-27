import { Component, OnInit, Input } from '@angular/core';
import {DashboardService} from '../shared/service/dashboard.service'
import {Article} from '../shared/models/article'

import {IMyDpOptions} from 'mydatepicker';
import * as moment from 'moment'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService: DashboardService) {
    this.beginDate = null;
    this.endDate = null;
    this.beginDateValue = '';
    this.endDateValue = '';

  }

  private articles: Article[];

  @Input() private beginDate: Date;
  @Input() private endDate: Date;

  @Input() private beginDateValue: string;
  @Input() private endDateValue: string;


  private beginCalendarVisible: boolean = false;
  private endCalendarVisible: boolean = false;
  private errorMessage: string = null;

  ngOnInit() {
    this.getArticles();
  }


  public getArticles(): void {
    this.errorMessage = null;
    this.dashboardService.getArticles(this.beginDateValue, this.endDateValue)
      .then(response => {
        if(response != null) {
          this.articles = response;
        }

      },
      error => {
        this.articles = null;
        if(error.status && error.status == 404) {
          this.errorMessage = 'The request has failed';
        }
        else {
          this.errorMessage = error;
        }

      });
  }



  public getFormattedDate(dateString: string): string {
    return moment.utc(dateString).format('YYYY-MM-DD, HH:mm');
  }

  private beginDateChanged(): void {
    this.beginDateValue = moment(this.beginDate).format("YYYY-MM-DD");
    this.hideBeginCalendar();
  }
  private endDateChanged(): void {
    this.endDateValue = moment(this.endDate).format("YYYY-MM-DD");
    this.hideEndCalendar();
  }


  private hideBeginCalendar(): void {
    this.beginCalendarVisible = false;
  }
  private hideEndCalendar(): void {
    this.endCalendarVisible = false;
  }
  private toggleBeginCalendar(): void {
    this.beginCalendarVisible = !this.beginCalendarVisible;
    this.hideEndCalendar();
  }
  private toggleEndCalendar(): void {
    this.endCalendarVisible = !this.endCalendarVisible;
    this.hideBeginCalendar();
  }




  private getMinEndDate(): Date {
    if(this.beginDateValue != '' && moment(this.beginDateValue).isValid()) {
      return this.beginDate;
    }
    else {
      return moment(0).toDate();
    }
  }
  private getMaxBeginDate(): Date {
    if(this.endDateValue != '' && moment(this.endDateValue).isValid()) {
      return this.endDate;
    }
    else {
      return moment().toDate();
    }
  }

}
