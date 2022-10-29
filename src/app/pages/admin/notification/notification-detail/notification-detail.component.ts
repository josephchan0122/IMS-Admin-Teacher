import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from '../../../../@core/mock/users.service';
import { NotificationData, ReceiverData } from '../../../../@core/models/notification';
import { USERROLE } from '../../../../@core/models/user';

@Component({
  selector: 'ngx-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.scss']
})
export class NotificationDetailComponent implements OnInit, OnChanges {
  @Input('data') data:NotificationData
  @Input('receivers') receivers:ReceiverData[];
  searchWord:string;
  filteredReceivers:any[];
  constructor() { }

  ngOnInit(): void {
    this.onSearchWordChange(undefined);
  }
  ngOnChanges(changes:SimpleChanges){
    this.onSearchWordChange(undefined);
  }
  onSearchWordChange(data:string){
    if(!data) {this.filteredReceivers = this.receivers;}
    else{
      let key = data.toLowerCase();
      this.filteredReceivers = this.receivers.filter((item:ReceiverData)=>{
        if(item.receiver.role == USERROLE.Teacher)
        {
          if(item.receiver.first_name.toLowerCase().includes(key)) return  true;
          if(item.receiver.last_name.toLowerCase().includes(key)) return  true;
        }else{
          if(item.receiver.child.first_name.toLowerCase().includes(key)) return  true;
          if(item.receiver.child.last_name.toLowerCase().includes(key)) return  true;
        }
        return false;
      });
    }
    return;
    let arr=[]
    this.filteredReceivers.forEach((item,index)=>{
      if(index % 2==0){
        let tt = [item];
        if(index + 1 < this.filteredReceivers.length)
          tt.push(this.filteredReceivers[index+1])
        arr.push(tt)
      }
    })
    this.filteredReceivers=arr;
  }
  isParent(item:ReceiverData){
    return item.receiver.role == USERROLE.Parent;
  }
  getPicture(item:ReceiverData){
    let url= this.isParent(item)? item.receiver.child.photo:item.receiver.picture
    if(url) return url;
    return undefined;
  }
  getName(item:ReceiverData){
    if(this.isParent(item)) return item.receiver.child.first_name+' ' + item.receiver.child.last_name;
    return item.receiver.first_name + ' ' + item.receiver.last_name;
  }
}

