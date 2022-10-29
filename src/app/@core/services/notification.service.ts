import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";

import { BehaviorSubject, forkJoin, Observable, of, Subject } from 'rxjs';
import { IMSNotification, NotificationData, NotificationVerb, ReceiverData } from '../models/notification';
import { retry, tap } from 'rxjs/operators';
import { not } from '@angular/compiler/src/output/output_ast';
import { ToastService } from './toast.service';
import { UsersService } from './users.service';
import { AuthService } from '../../auth.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  api_url = environment.API_URL;
  socket_url = environment.SOCKETURL;
  private socket_obj;
  public onnew:Subject<IMSNotification> = new Subject<IMSNotification>();
  private is_added_new_msg_notfication:boolean = false;
  public notificationSubject:BehaviorSubject<IMSNotification[]> = new BehaviorSubject<IMSNotification[]>([]);
  constructor(
    private httpClient:HttpClient,
    private toastService:ToastService,
    private messageService:MessageService,
    private authService:AuthService
    ) { 
  }
  connect(){
    if(!this.socket_obj){      
      document.cookie=`usertoken=${this.authService.getAccessToken()};path=/`;
      this.socket_obj = new WebSocket(this.socket_url);
      
      this.socket_obj.onopen = (e)=>{
        
      }
      this.socket_obj.onmessage = (e)=>{
        
        
        console.log(e);
        try{
          let notification:IMSNotification=undefined;
          notification = JSON.parse(e.data).message;
          console.log(JSON.parse(e.data).message)

          switch (notification.data.verb) {
            case NotificationVerb.MessageCreate:
              this.toastService.info('New Message has been arrived', 'Info');
              this.add_unread_msg_notfication();  
              break;
            case NotificationVerb.UnreadMessage:
              this.add_unread_msg_notfication();  
              break;
            case NotificationVerb.NoMessage:
              this.remove_unread_msg_notification();
            
            default:
              break;
          }
          this.onnew.next(notification);
        }catch(err){
          console.log(e.data)
          console.log(err);
          return;
        }        
      }
      this.socket_obj.onerror = (e)=>{
      }
      this.socket_obj.onclose = (e)=>{
        this.socket_obj = undefined;
        setTimeout(()=>{this.connect()},60*1000);
      }
    }
    // this.socket.connect();
  }
  getNotifications():Observable<IMSNotification[]>{
    forkJoin({
      'unread':this.messageService.check_message_readness(),
      'data':this.httpClient.get<IMSNotification[]>(`${this.api_url}/notification?is_read=False`)
    }).subscribe(ret=>{
      if(ret.data){
        this.notificationSubject.next(ret.data)
      }
      if (ret.unread) {this.add_unread_msg_notfication();}
    })
    return of([]);
  }
  remove_unread_msg_notification(){
    if(!this.is_added_new_msg_notfication) return ;
    let notifications:IMSNotification[]  = this.notificationSubject.value;
    let new_notfications = notifications.reduce((retArr,item)=>{
      if(item.data.verb != NotificationVerb.UnreadMessage)
        retArr.push(item)
      return retArr;
    },[]);

    this.notificationSubject.next(new_notfications);
    this.is_added_new_msg_notfication = false;
  }
  add_unread_msg_notfication(){
    if(this.is_added_new_msg_notfication) return;
    let notifications:IMSNotification[]  = this.notificationSubject.value;
    notifications.push({
      id:-1,
      data:{
        id:-1,
        verb:NotificationVerb.UnreadMessage,
        content:'',
        subject:'',
        is_child_broadcast:false,
        created_at:undefined,
        sender:undefined,
      },
      receiver:-1,
      is_read:false,
      created_at:undefined
    })
    this.notificationSubject.next(notifications);
    this.is_added_new_msg_notfication = true;
  }
  getNotificationData():Observable<NotificationData[]>{
    return this.httpClient.get<NotificationData[]>(`${this.api_url}/notification/headers/`);
  }
  getNotificationReceivers(item:NotificationData):Observable<ReceiverData[]>{
    return this.httpClient.get<ReceiverData[]>(`${this.api_url}/notification/headers/${item.id}/receivers`);
  }
  sendNotification(item:any){
    let data = item;
    if (!('verb' in item)){
      data['verb'] = NotificationVerb.Normal;
    }
    return this.httpClient.post(`${this.api_url}/notification/headers/`,data);
  }
}
