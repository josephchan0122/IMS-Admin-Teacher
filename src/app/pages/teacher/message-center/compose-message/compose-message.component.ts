import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../@core/services/users.service';
import { User } from '../../../../@core/models/user';
import { TagInputItem } from '../../../../shared/components/tag-input/tag-input.component';
import { MessageService } from '../../../../@core/services/message.service';
import { Message, MessageType } from '../../../../@core/models/message';
import { ReplyData } from '../../../../shared/components/reply/reply.component';
import { forkJoin } from 'rxjs';
import { ToastService } from '../../../../@core/services/toast.service';

@Component({
  selector: 'ngx-compose-message',
  templateUrl: './compose-message.component.html',
  styleUrls: ['./compose-message.component.scss']
})
export class ComposeMessageComponent implements OnInit {
  currentUser:User;
  constructor(
    private userService:UsersService,
    private messageSerivce:MessageService,
    private toastService:ToastService
    ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user:User)=>{
      this.currentUser = user;
    })
  }
  onSend(data:ReplyData){    
    let requests=[];
    data.to_contacts.forEach((contact:TagInputItem)=>{
      let msg:Message= this.messageSerivce.newMessage();
      msg.subject = data.subject;
      msg.content = data.content;
      msg.msgType = MessageType.Normal;
      if(data.isAttached)  msg.attachedFiles = data.fileIds;
      else msg.attachedFiles=[];
      msg.sender = this.currentUser;  
      msg.child = contact.child;
      msg.receiver = contact.user;
      requests.push(this.messageSerivce.sendMessage(msg))
    })
    if(requests.length > 0){
      forkJoin(requests).subscribe(_=>{
        this.toastService.success('Message has been sent successfully', 'success');
      })
    }
  }
}
