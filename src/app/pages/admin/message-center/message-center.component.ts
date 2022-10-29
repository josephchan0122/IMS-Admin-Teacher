import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message } from "../../../@core/models/message";
import { User,USERROLE } from "../../../@core/models/user";
import { MessageService } from "../../../@core/services/message.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as moment from 'moment';
import { UsersService } from '../../../@core/services/users.service';
import { NotificationService } from '../../../@core/services/notification.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IMSNotification, NotificationVerb } from '../../../@core/models/notification';
@Component({
  selector: 'ngx-message-center',
  templateUrl: './message-center.component.html',
  styleUrls: ['./message-center.component.scss']
})
export class MessageCenterComponent implements OnInit, OnDestroy {

  public messages:Message[];
  user:User;
  private destroy$:Subject<void> = new Subject<void>();
  constructor(private messageSerivce:MessageService,
              private userService:UsersService,
              private route:ActivatedRoute,
              private router:Router,
              private notificationService:NotificationService,
    ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user)=>{this.user = user;})
    this.messageSerivce.getAdminHeaderMessage().subscribe((msgs)=>{      
      this.messages = msgs;
      this.messages.sort((a:Message,b:Message)=>{
        let ma = moment(a.created_at);
        let mb = moment(b.created_at);
        if(ma.isAfter(mb)) return 1;
        return 0;
      })
      this.notificationService.onnew.pipe(takeUntil(this.destroy$)).subscribe((notification:IMSNotification) => { 
        if(notification.data.verb == NotificationVerb.MessageCreate){
          this.messageSerivce.getAdminHeaderMessage().subscribe((msgs)=>{
            this.messages = msgs;
            this.messages.sort((a:Message,b:Message)=>{
              let ma = moment(a.created_at);
              let mb = moment(b.created_at);
              if(ma.isAfter(mb)) return 1;
              return 0;
            })
          }) 
        }
      })     
    })
  }
  
  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }
  getFormatDate(date:string){
    let md = moment(date);
    if(md.isValid)
      return md.format('LT');
    return '';
  }
  goToMessageDetail(msg:Message){
    if(msg.headerMessage)
      this.router.navigate([msg.headerMessage],{relativeTo:this.route})
    else
      this.router.navigate([msg.id],{relativeTo:this.route})
  }
  getSenderName = this.messageSerivce.getSenderName;
  getReceiverName = this.messageSerivce.getReceiverName;
  getSenderPhotoUrl = this.messageSerivce.getSenderPhotoUrl;
  getReceiverPhotoUrl = this.messageSerivce.getReceiverPhotoUrl;
  isAdmin(user:User){
    return user.role == USERROLE.Admin;
  }
  isRead(msg:Message){
    if(msg.receiver.role!=this.user.role) return true;
    
    if (this.user.role == USERROLE.Parent){
      if(this.user.child.sibling_group == msg.receiver.child.sibling_group) return msg.is_read;
      return true;
    }else{
      if(this.user.id == msg.receiver.id)
        return msg.is_read;
      else
        return true;
    }
  }
}
