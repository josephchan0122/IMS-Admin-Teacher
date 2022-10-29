import { Component, OnInit } from '@angular/core';
import { DocumentsService } from "../../../@core/services/documents.service";
import { documents } from '../../../@core/dummy';
import { Document, DocumentFor } from '../../../@core/models/document';
import { ToastService } from '../../../@core/services/toast.service';
@Component({
  selector: 'ngx-school-documents',
  templateUrl: './school-documents.component.html',
  styleUrls: ['./school-documents.component.scss']
})
export class SchoolDocumentsComponent implements OnInit {

  public documents:any[];
  public isAdd:boolean = false;

  constructor(private documentService:DocumentsService, private toastService:ToastService) { }

  ngOnInit(): void {
    this.documents=[];
    this.documentService.getDocuments().subscribe(documents=>{
      this.documents = documents;
    })
  }
  get forClassroomDocuments(){
    return this.documents.filter((item:Document) => {
      return item.documentfor == DocumentFor.Classroom
    })
  }
  get forAllDocuments(){
    return this.documents.filter((item:Document) => {
      return item.documentfor == DocumentFor.All
    })
  }

  onUploaded(data){
    this.documents.push({
      name:data.data.name,
      url:data.data.url,
      documentfor:data.documentFor
    })
  }

  removeDocument(document:Document) {

    this.documentService.deleteDocument(document.id).toPromise().then(_ =>{
      this.toastService.success('Document has been deleted','success');
      this.documents = this.documents.reduce((retArray, item:Document)=>{
        if(item.id != document.id)
          retArray.push(item);
        return retArray
      }, [])
    })
  }

}
