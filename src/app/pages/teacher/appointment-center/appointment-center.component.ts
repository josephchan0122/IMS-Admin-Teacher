import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../@core/services/appointment.service';
import { Appointment, AppointmentType, AppointmentStatus } from '../../../@core/models/appointment';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CalendarEvent, CalendarView, CalendarEventAction } from "angular-calendar";
import { User } from '../../../@core/models/user';
import { ConfirmDialogComponent } from "./components/confirm-dialog/confirm-dialog.component";
import * as moment from "moment";
import { NbDialogService } from '@nebular/theme';
import { CONNREFUSED } from 'dns';

@Component({
  selector: 'ngx-appointment-center',
  templateUrl: './appointment-center.component.html',
  styleUrls: ['./appointment-center.component.scss']
})
export class AppointmentCenterComponent implements OnInit {
  apnts:Appointment[];
  userId:number;
  user:User;
  selectedDate:Date;
  filteredapnts:Appointment[];
  filterCriteriaList:AppointmentStatus[];
  constructor(
    private apntService:AppointmentService,
    private dialogService:NbDialogService
  ) { 
    this.selectedDate = moment().toDate();
    this.filterCriteriaList = [AppointmentStatus.CONFIRM, AppointmentStatus.DECLINE, AppointmentStatus.PENDING]
  }



  ngOnInit(): void {
    this.apntService.getEventsOfCurrentUser().subscribe((data:Appointment[]) => {
      this.apnts = data;
      this._updateAppointment();
    })
  }
  dateTimeChange(){
    this._updateAppointment();

  }
  onNext(){
    this.selectedDate = moment(this.selectedDate).add(1,"day").toDate();
    this._updateAppointment();
  }
  onToday(){
    this.selectedDate = moment().toDate();
    this._updateAppointment();
  }
  onPrevious(){
    this.selectedDate = moment(this.selectedDate).subtract(1,"day").toDate();
    this._updateAppointment();
  }
  _updateAppointment(){
    this.filteredapnts =  this.apnts.filter((item:Appointment)=>{
      let findedIndex = this.filterCriteriaList.findIndex((st:AppointmentStatus)=>{
        return st == item.status;
      })
      if(findedIndex !=-1){
        let start = moment(item.start);
        let end = moment(item.end);
        let selected = moment(this.selectedDate);
        if(selected.isSameOrBefore(end,'day')){
          
          return true;
        }
      }
      
      return false;
    })
  }
  get_time_text(apnt:Appointment):string{    
    return moment(apnt.start).format("HH:mm") + " - " + moment(apnt.end).format("HH:mm");
  }
  get_date_text(apnt:Appointment):string{
    return moment(apnt.start).format("LL");
  }
  isPreset(apnt:Appointment):boolean{
    return apnt.type === AppointmentType.PRESET;
  }
  isConfirmed(apnt:Appointment):boolean{
    return apnt.status === AppointmentStatus.CONFIRM
  }
  isDeclined(apnt:Appointment):boolean{
    return apnt.status === AppointmentStatus.DECLINE;
  }
  isAvailable(apnt:Appointment):boolean{
    return (apnt.status === AppointmentStatus.PENDING);
  }
  onCheckBoxChange(data){
    let status:AppointmentStatus;
    if(data=='confirm'){
      status = AppointmentStatus.CONFIRM
    }
    if(data == 'decline') status = AppointmentStatus.DECLINE
    if(data == 'pending') status = AppointmentStatus.PENDING
    let index =  this.filterCriteriaList.findIndex((item:AppointmentStatus)=>{
      return item == status
    })
    if(index ==-1){
      this.filterCriteriaList.push(status)
    }else
      this.filterCriteriaList.splice(index,1);
    console.log(this.filterCriteriaList)
    this._updateAppointment();
  }
  onConfirmBtnClick(apnt:Appointment){
    this.dialogService.open(ConfirmDialogComponent,{context:{
      apnt:apnt
    }}).onClose.subscribe(ret=>{
      console.log(ret.status);
      if(ret.status){
        if(ret.status != apnt.status)
          this.apntService.patchEvent(apnt, {status:ret.status, comment:ret.comment}).subscribe(data =>{         
            apnt.status = data.status
          }) 
      }
    })

  }
  get selectedDateString():string{
    return moment(this.selectedDate).format("MMMM Do YYYY");
  }
}
