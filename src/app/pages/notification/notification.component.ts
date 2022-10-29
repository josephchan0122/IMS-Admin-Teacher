import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IMSNotification, NotificationVerb } from '../../@core/models/notification';
import { USERROLE } from '../../@core/models/user';
import { MessageService } from '../../@core/services/message.service';
import { Message } from '../../@core/models/message';
import { NotificationService } from '../../@core/services/notification.service';

@Component({
  selector: 'ngx-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy{
  notifications:IMSNotification[] =[];
  destroy$:Subject<void>=new Subject<void>()
  constructor(
    private notificationService:NotificationService,
    private messageSerivce:MessageService
  ) { }

  ngOnInit(): void {
    this.notificationService.notificationSubject.pipe(takeUntil(this.destroy$)).subscribe(data=>{
      this.notifications = data;
    })
    this.notificationService.getNotifications().subscribe(data=>{
      console.log(data);
    })
   
  }
  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }
  resolveSenderName(notification:IMSNotification){
    let sender = notification.data.sender;
    switch(notification.data.sender.role){
      case USERROLE.Admin:
        return 'Admin Center';
      case USERROLE.Parent:
        return sender.child.first_name + " " + sender.child.last_name;
      case USERROLE.Teacher:
        return sender.first_name + " " + sender.last_name;
    }
  }
  resolveNotficationData(notification:IMSNotification){

  }
  isMessageCreate(notification:IMSNotification){
    return notification.data.verb == NotificationVerb.MessageCreate;
  }
}
