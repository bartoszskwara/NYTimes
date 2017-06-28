import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardService } from './shared/service/dashboard.service';
import { PaginationService } from './shared/service/pagination.service';

import {AppRoutingModule} from './app.routing'
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { DatepickerModule } from 'ngx-bootstrap';
import { AccordionModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    DatepickerModule.forRoot(),
    AccordionModule.forRoot()
  ],
  providers: [DashboardService, PaginationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
