import { Component, OnInit, Input } from '@angular/core';
import {DashboardService} from '../shared/service/dashboard.service'
import {Article} from '../shared/models/article'
import {PaginationService} from '../shared/service/pagination.service'
import * as moment from 'moment'
import { PagesData } from '../shared/models/PagesData'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {



  public articles: Article[];

  public beginDate: Date;
  public endDate: Date;

  @Input() public beginDateValue: string;
  @Input() public endDateValue: string;


  public beginCalendarVisible: boolean = false;
  public endCalendarVisible: boolean = false;
  public beginInvalidInput: boolean = false;
  public endInvalidInput: boolean = false;
  public errorMessage: string = null;

  public pagesData: PagesData;

  public loading: boolean = true;

  constructor(private dashboardService: DashboardService, private paginationService: PaginationService) {
    this.beginDate = null;
    this.endDate = null;
    this.beginDateValue = '';
    this.endDateValue = '';
    this.pagesData = this.paginationService.getPagesData();
  }


  ngOnInit() {
    this.getArticles();
  }


  public getArticles(): void {

    this.errorMessage = null;
    if(moment(this.beginDateValue).isValid() || moment(this.endDateValue).isValid() || (this.beginDateValue == '' && this.endDateValue == '')) {
      this.dashboardService.getArticles(this.beginDateValue, this.endDateValue)
        .subscribe(
          response => {
            this.loading = true;
            if(response != null) {
              this.articles = response.response.docs;

              this.paginationService.resetPagination();
              this.paginationService.setPagination(this.articles.length);
              this.pagesData = this.paginationService.getPagesData();


            }
          },
          error => {
            this.articles = null;
            this.paginationService.resetPagination();
            this.paginationService.setPagination(0);
            this.pagesData = this.paginationService.getPagesData();

            if(error.status && error.status == 404) {
              this.errorMessage = 'The request has failed';
            }
            else {
              this.errorMessage = error;
            }

          },
          () => {
            this.loading = false;
            console.log('finish');
            console.log(this.articles);
          }
        );
    }
    else {
      this.paginationService.resetPagination();
      this.paginationService.setPagination(0);
      this.pagesData = this.paginationService.getPagesData();
      this.errorMessage = 'Invalid date format';
    }


  }



  public getFormattedDate(dateString: string): string {
    return moment.utc(dateString).format('YYYY-MM-DD, HH:mm');
  }

  public beginDateChanged(): void {
    this.beginDateValue = moment(this.beginDate).format("YYYY-MM-DD");
    this.beginInputChanged();
    this.hideBeginCalendar();
  }
  public endDateChanged(): void {
    this.endDateValue = moment(this.endDate).format("YYYY-MM-DD");
    this.endInputChanged();
    this.hideEndCalendar();
  }


  public beginInputChanged(): void {
    if(!moment(this.beginDateValue).isValid()) {
      this.beginInvalidInput = true;
    }
    else {
      this.beginInvalidInput = false;
    }
  }
  public endInputChanged(): void {
    if(!moment(this.endDateValue).isValid()) {
      this.endInvalidInput = true;
    }
    else {
      this.endInvalidInput = false;
    }
  }

  private hideBeginCalendar(): void {
    this.beginCalendarVisible = false;
  }
  private hideEndCalendar(): void {
    this.endCalendarVisible = false;
  }
  public toggleBeginCalendar(): void {
    this.beginCalendarVisible = !this.beginCalendarVisible;
    this.hideEndCalendar();
  }
  public toggleEndCalendar(): void {
    this.endCalendarVisible = !this.endCalendarVisible;
    this.hideBeginCalendar();
  }




  public getMinEndDate(): Date {
    if(this.beginDateValue != '' && moment(this.beginDateValue).isValid()) {
      return this.beginDate;
    }
    else {
      return moment(0).toDate();
    }
  }
  public getMaxBeginDate(): Date {
    if(this.endDateValue != '' && moment(this.endDateValue).isValid()) {
      return this.endDate;
    }
    else {
      return moment().toDate();
    }
  }



public changePage(pageNumber: number) {
  if(pageNumber >= 1 && pageNumber <= this.pagesData.totalPageNumber) {
    this.paginationService.changePage(pageNumber);
    this.pagesData = this.paginationService.getPagesData();
  }


}









}
