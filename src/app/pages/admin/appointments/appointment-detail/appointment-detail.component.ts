import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CalendarEvent, CalendarView, CalendarEventAction } from "angular-calendar";
import { DOCUMENT } from '@angular/common';
import { AppointmentService } from "../../../../@core/services/appointment.service";
import { UsersService } from "../../../../@core/services/users.service";
import { User, USERROLE } from "../../../../@core/models/user";
import { Appointment, AppointmentType } from "../../../../@core/models/appointment";
import { calendarEventFromAppointment } from "../../../../@core/utils/calendar.util";


import * as moment from "moment";
import { map, switchMap } from 'rxjs/operators';
import { forkJoin, observable } from "rxjs";

import { CalendarEventActionsComponent } from 'angular-calendar/modules/common/calendar-event-actions.component';
import { fork } from 'cluster';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { YesNoDialogComponent } from '../../../../components/yes-no-dialog/yes-no-dialog.component';
import { ToastService } from '../../../../@core/services/toast.service';

@Component({
  selector: 'ngx-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.scss']
})
export class AppointmentDetailComponent implements OnInit, OnDestroy {
  view: CalendarView = CalendarView.Month;
  viewDate = new Date();
  events: CalendarEvent[];
  activeDayIsOpen:boolean = true;
  userId:number;
  user:User;
  private readonly darkThemeClass = 'dark-theme';
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Detail',
      onClick: ({ event }: { event: CalendarEvent }): void => {        
        this.onDetailEvent(event);
      },
    },    
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {        
        this.onDeleteEvent(event);
      },
    },  
    
  ];
  constructor(
    @Inject(DOCUMENT) private document,
    private appointmentService:AppointmentService,
    private userService:UsersService,
    private route:ActivatedRoute,
    private router:Router,
    private dialogService:NbDialogService,
    private toastrService:ToastService
  ) { }

  ngOnInit(): void {
    this.document.body.classList.add(this.darkThemeClass);
    this.route.paramMap.pipe(
      switchMap(
        params => {
          this.userId = Number(params.get('id'));
          return forkJoin({
            user:this.userService.getUserById(this.userId),
            appointments:this.appointmentService.getEventsByUserId(this.userId)
          });
        }
      ),
      map(( {user,appointments}:{user:User, appointments:Appointment[]} )=>{        
        this.user= user;        
        return appointments.map(item=>{                    
          return calendarEventFromAppointment(item, this.actions);
        })
      })
    ).subscribe((res:CalendarEvent[])=>{this.events = res;})    
  }
  
  onDetailEvent(event: CalendarEvent): void {
    if(event.meta == AppointmentType.FREE)
      this.router.navigate([event.id],{relativeTo:this.route})
    if(event.meta == AppointmentType.PRESET){
      this.router.navigate([`/appointment/preset/${event.id}`]);
    }
  }
  onDeleteEvent(event: CalendarEvent): void {
    this.dialogService.open(YesNoDialogComponent,{context:{
      title:'Are you sure?'
    }}).onClose.subscribe(ret=>{
      if(ret==true){
        this.appointmentService.deleteEventById(event.id).subscribe(_=>{
          let index = this.events.findIndex(item=>{
            return item.id == event.id;
          })
          this.events.splice(index,1);
          this.events = Object.assign([], this.events);
          this.toastrService.success('Deleted the Appointment',"Success");
        });
      }
    });
    
  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {

    if (moment(date).isSame(this.viewDate,'month')) {
      if (
        (moment(date).isSame(this.viewDate,'day') && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }
  back(){
    this.router.navigate(['/appointment'])
  }
  ngOnDestroy(): void {
    this.document.body.classList.remove(this.darkThemeClass);
  }
  getName(user:User){
    if (!user) return ''
    if(user.role == USERROLE.Parent)
      if(user.child) return user.child.first_name +' '+ user.child.last_name;
    return user.first_name + ' ' + user.last_name
  }
  getPicture(user:User){
    if (!user) return '';
    if(user.role == USERROLE.Parent)
      if(user.child) return user.child.photo
    return user.picture
  }
}
