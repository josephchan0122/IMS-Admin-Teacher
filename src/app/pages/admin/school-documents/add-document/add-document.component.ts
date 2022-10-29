import { Component, OnInit, Inject, OnDestroy, Output, EventEmitter } from '@angular/core';
import { NgxFileUploadStorage, NgxFileUploadRequest,NgxFileUploadOptions, NgxFileUploadState, NgxFileUploadFactory } from "@ngx-file-upload/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { DocumentsService } from '../../../../@core/services/documents.service';
import { DocumentFor } from '../../../../@core/models/document';
import { environment } from "../../../../../environments/environment";
@Component({
  selector: 'ngx-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent implements OnInit {
  @Output('onUploaded') onUploadedEvent = new EventEmitter();
  selectList:any;
  uploadUrl:string;
  documentFor:DocumentFor;
  Classroom = DocumentFor.Classroom;
  All = DocumentFor.All;
  public uploadStates = NgxFileUploadState;
public uploads: NgxFileUploadRequest[] = [];

  public destroy$: Subject<boolean> = new Subject();
  public storageClasrrom: NgxFileUploadStorage;
  public storageAll: NgxFileUploadStorage;
  public uploadedClassroomRequestIds:any[];
  public uploadedAllRequestIds:any[];
  public constructor(         
    private documentService:DocumentsService  
  ) {
    this.documentFor = DocumentFor.All;
    this.uploadUrl = `${environment.API_URL}/upload/document/`;

    this.selectList = Object.keys(DocumentFor).map(key=>{return {key:key, value:DocumentFor[key]}});
    
    this.storageClasrrom = new NgxFileUploadStorage({
      concurrentUploads: 4,
    });
    this.storageAll = new NgxFileUploadStorage({
      concurrentUploads: 4,
    });
    this.uploadedClassroomRequestIds = [];
    this.uploadedAllRequestIds = [];
    this.storageClasrrom.change().subscribe((requests:NgxFileUploadRequest[])=>{
      console.log(requests.length);
      requests.forEach(item=>{        
        if(item.isCompleted()){
          console.log(item);
          if(!this.uploadedClassroomRequestIds.includes(item.requestId)){
            console.log(item.data.response.body);
            this.uploadedClassroomRequestIds.push(item.requestId);
            this.onUploadedEvent.emit({documentFor:DocumentFor.Classroom, data:item.data.response.body});
          }
          
        }
      })
    })

    this.storageAll.change().subscribe((requests:NgxFileUploadRequest[])=>{
      console.log(requests.length);
      requests.forEach(item=>{        
        if(item.isCompleted()){
          console.log(item);
          if(!this.uploadedAllRequestIds.includes(item.requestId)){
            console.log(item.data.response.body);
            this.uploadedAllRequestIds.push(item.requestId);
            this.onUploadedEvent.emit({documentFor:DocumentFor.All, data:item.data.response.body});
          }
          
        }
      })
    })
    
  }

  ngOnInit(): void {
  }
  selectChange($event){
    this.documentFor = $event;

  }

}
