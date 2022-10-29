import { Component, OnInit } from '@angular/core';
import { DocumentsService } from '../../../@core/services/documents.service';

@Component({
  selector: 'ngx-school-documents',
  templateUrl: './school-documents.component.html',
  styleUrls: ['./school-documents.component.scss']
})
export class SchoolDocumentsComponent implements OnInit {

  public documents:any[];

  constructor(private documentService:DocumentsService) { }

  ngOnInit(): void {
    this.documentService.getDocuments().subscribe(documents=>{
      this.documents = documents;
    })
  }

}
