import { Injectable } from '@angular/core';
import { PagesData } from '../models/PagesData'

@Injectable()
export class PaginationService {

  private currentPageNumber: number;
  private articlesPerPage: number;
  private totalPageNumber: number;
  private numberOfAllArticles: number;
  private startPage: number;
  private endPage: number;


  constructor() {
    this.resetPagination();
  }

  public resetPagination():void {
    this.currentPageNumber = 1;
    this.articlesPerPage = 4;
    this.totalPageNumber = 1;
    this.numberOfAllArticles = 0;
    this.startPage = 1;
    this.endPage = 1;
  }


  public setPagination(articlesLength: number):void {
    this.numberOfAllArticles = articlesLength;
    this.setPageNumbers();

  }

  public getPagesData(): PagesData {
    return {
      currentPageNumber: this.currentPageNumber,
      articlesPerPage: this.articlesPerPage,
      totalPageNumber: this.totalPageNumber,
      numberOfAllArticles: this.numberOfAllArticles,
      startPage: this.startPage,
      endPage: this.endPage,
      arrayOfPages: this.getArrayOfPageNumbers(),
      indexes: this.getArrayOfIndexes()
    }
  }


  public setPageNumbers(): void {
    this.currentPageNumber = this.currentPageNumber || 1;
    this.articlesPerPage = this.articlesPerPage;

    this.totalPageNumber = Math.ceil( this.numberOfAllArticles / this.articlesPerPage);

    if(this.totalPageNumber <= 3) {
      this.startPage = 1;
      this.endPage = this.totalPageNumber;
    }
    else {
      if (this.currentPageNumber <= 2) {
          this.startPage = 1;
          this.endPage = 3;
      } else if (this.currentPageNumber + 1 >= this.totalPageNumber) {
          this.startPage = this.totalPageNumber - 2;
          this.endPage = this.totalPageNumber;
      } else {
          this.startPage = this.currentPageNumber - 1;
          this.endPage = this.currentPageNumber + 1;
      }
    }

  }

  public changePage(pageNumber: number): void {
      this.currentPageNumber = pageNumber;
      this.setPageNumbers();
  }


  public getFirstArticleIndex(): number {
    return (this.currentPageNumber - 1) * this.articlesPerPage;
  }

  public getLastArticleIndex(): number {
    return Math.min(this.getFirstArticleIndex() + this.articlesPerPage - 1, this.numberOfAllArticles - 1);
  }

  public getArrayOfPageNumbers(): number[] {
    let pages = [];
    for(let i = this.startPage; i <= this.endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  public getArrayOfIndexes(): number[] {
    let indexes = [];
    for(let i = this.getFirstArticleIndex(); i <= this.getLastArticleIndex(); i++) {
      indexes.push(i);
    }
    return indexes;
  }

}
