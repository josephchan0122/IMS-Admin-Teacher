import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { NgxFileUploadStorage, NgxFileUploadFactory, NgxFileUploadOptions, NgxFileUploadRequest } from "@ngx-file-upload/core";
import { of, Observable } from "rxjs";
import { UsersService } from "../../../@core/services/users.service";
import { User, USERROLE } from "../../../@core/models/user";
import { UserService } from '../../../@core/mock/users.service';
import { TagInputItem } from '../tag-input/tag-input.component';
import { environment } from "../../../../environments/environment";

export interface ReplyData{
  to_contacts:TagInputItem[],
  subject:string,
  content:string,
  fileIds:any[],
  isAttached:boolean

}
@Component({
  selector: 'ngx-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss'],

})
export class ReplyComponent implements OnInit {
  @Input() isReplyMode:boolean;
  @Input() fromContact:User;
  @Output('onsend') onSendEvent = new EventEmitter();
  public isSubmitted:boolean;
  public uploadedFileIds:number[];
  public fromString:string;
  public subject:string;
  public to_contacts:TagInputItem[];

  public content;
  public uploads: NgxFileUploadRequest[] = [];

  public storage: NgxFileUploadStorage;

  private uploadOptions: NgxFileUploadOptions;
  public isAttached:boolean;
  public items:[];
  public users:User[];
  constructor( @Inject(NgxFileUploadFactory) private uploadFactory: NgxFileUploadFactory,
              private userService:UsersService) {
    this.storage = new NgxFileUploadStorage({
      concurrentUploads: 2,
      autoStart: true,
      // removeCompleted: 1000 // remove completed after 5 seconds
    });
    this.uploadOptions = {url: `${environment.API_URL}/messages/file/upload/`};
    this.isReplyMode = false;
    this.uploadedFileIds = [];
  }
  
  

  ngOnInit(): void {    
    this.isAttached = false;
    this.to_contacts = [];
    this.isSubmitted = false;

    this.storage.change()
    .subscribe(uploads => {
      this.uploads = uploads
      console.log(this.uploads);
      uploads.forEach(item=>{
        if(item.isCompleted()){
          let itemId =item.data.response.body.id; 
          if(!this.uploadedFileIds.includes(itemId)) this.uploadedFileIds.push(itemId);
        }
      })
    });
    
    this.userService.getParents().subscribe((users:User[])=>{
      this.users = users;
    })    
    this.fromString = this.getFromString();
  }
  getFromString(){
    if(!this.fromContact) return '';
    if(this.fromContact.role == USERROLE.Admin)
      return "Admin Center"
    if(this.fromContact.role == USERROLE.Teacher)
      return this.fromContact.first_name + " " + this.fromContact.last_name;
  }
  
  public onSelect(event) {
    console.log("Select", event)
    const addedFiles: File[] = event.addedFiles;
    const uploads = this.uploadFactory.createUploadRequest(addedFiles, this.uploadOptions);    
    this.storage.add(uploads);

  }
  public onRemove(upload: NgxFileUploadRequest) {
    if(upload.isCompleted){
      let itemId = upload.data.response.body.id;
      this.uploadedFileIds = this.uploadedFileIds.reduce((retarr,item)=> {
        if(!item == itemId)
          retarr.push(item);
        return retarr;
      },[]);
    }
    this.storage.remove(upload);
  }
  public send(){
    this.isSubmitted = true;
    let data:ReplyData = {
      to_contacts:this.to_contacts,
      subject:this.subject,
      content:this.content,
      fileIds: this.uploadedFileIds,
      isAttached:this.isAttached
    }
    
    if(this.to_contacts.length >0 && this.content && this.subject){      
      this.onSendEvent.emit(data)
    }
    if(this.isReplyMode&&this.content){
      this.onSendEvent.emit(data);
    }
    
  }
}
