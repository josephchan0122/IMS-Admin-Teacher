import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Child } from "../../../@core/models/child";
import { LocalDataSource } from 'ng2-smart-table';
import { ChildCellComponent } from "../child-cell/child-cell.component";
@Component({
  selector: 'ngx-child-list',
  templateUrl: './child-list.component.html',
  styleUrls: ['./child-list.component.scss']
})
export class ChildListComponent implements OnInit, OnChanges {

  @Input() data;
  @Output('onselect') onSelectEvent = new EventEmitter();
  searchWord:string;
  parents: Child[] = [];
  parent_src: LocalDataSource;
  settings = {
    actions:{
      add:false,
      edit:false,
      delete:false,
      position:'right'
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    hideSubHeader:true,
    hideHeader:true,
    pager:{
      perPage:4
    },
    columns: {
      picture:{
        type: 'custom',
        renderComponent: ChildCellComponent,
      }      
    },
  };
  purpose:string;
  constructor() {
    this.parent_src = new LocalDataSource();
  }

  ngOnInit(): void {
    if(this.data){
      this.parents = this.data;
      this.parent_src.load(this.parents);
    }
  }
  ngOnChanges(changes:SimpleChanges){
    if('data' in changes){
      if(this.data)
        this.parent_src.load(this.data);
    }
  }
  onSearchWordChange(newWord:string){
    this.searchWord = newWord;
    if(this.searchWord){

      this.parent_src.setFilter([{field:'first_name',search:this.searchWord}, {field:'last_name', search:this.searchWord}], false);    
    }else{
      this.parent_src.setFilter(null);
    }    
  }
  onRowSelect(event) {
    let selected_user:Child = event.data;
    this.onSelectEvent.emit(selected_user);
  } 

}
