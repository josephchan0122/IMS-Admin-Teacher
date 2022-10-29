import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CONSTANTS } from "../../../constants";

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy  {
  private unsubscribeAll: Subject<any> = new Subject<any>();
  private studentSubScription:Subscription;
  public dashboardItems:{key:string, value:string}[];  
  public seriesData;
  public seriesName;
  public dashboardItem;

  constructor(){
    this.dashboardItems = CONSTANTS.dashboardItems;
    this.dashboardItem = this.dashboardItems[0];
    // this.studentSubScription =  this.studentService.students.pipe(
    //   takeUntil(this.unsubscribeAll)
    // ).subscribe((students:any[])=>{
    // })
  }
  ngOnInit(): void {    
    // this.studentService.GetAllStudents();    
  }
  ngAfterViewInit(){

  }
  
  ngOnDestroy(){
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  
}
