import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IMSNotification, NotificationData, ReceiverData } from '../../../@core/models/notification';
import { NotificationService } from '../../../@core/services/notification.service';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'ngx-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {
  notifications:NotificationData[];
  filteredNotifications:NotificationData[];
  searchWord:string;
  isDetail=false;
  destroy$:Subject<void> = new Subject<void>();
  selectedNotification:NotificationData;
  selectedReceivers:ReceiverData[]=[];
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private notificationService:NotificationService,
  ) { }

  ngOnInit(): void {
    this.notificationService.getNotificationData().pipe(takeUntil(this.destroy$))
        .subscribe((data:NotificationData[])=>{
          this.notifications = data;
          this.onSearchWordChange(this.searchWord);
          this.isDetail=false;
        })
  }
  newNotification(){
    this.router.navigate(['send'],{relativeTo:this.route});
  }
  ngOnDestroy(): void{
    this.destroy$.next();
    this.destroy$.complete();
  }
  onSearchWordChange(data){
    if(!data) {this.filteredNotifications = this.notifications; return;}
    this.filteredNotifications = this.notifications.filter((item:NotificationData)=>{return item.content.includes(this.searchWord) || item.subject.includes(this.searchWord) });
  }
  getFormatDate(date:string){
    let md = moment(date);
    if(md.isValid)
      return md.format('LT');
    return '';
  }
  onItemSelect(item:NotificationData){
    console.log("HI");   
    this.prepareReceiver(item);
  }
  prepareReceiver(item){
    if(!item) {this.isDetail=false; return;}
    this.notificationService.getNotificationReceivers(item).pipe(takeUntil(this.destroy$))
                            .subscribe(datas=>{this.selectedReceivers = datas; this.selectedNotification=item;    this.isDetail=true;  })
  }
}
