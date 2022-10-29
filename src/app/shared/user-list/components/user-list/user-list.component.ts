import { Component, OnInit, OnDestroy, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { User, USERROLE } from "../../../../@core/models/user";
import { UsersService } from "../../../../@core/services/users.service";
import { LocalDataSource } from 'ng2-smart-table';
import { CellAvatarComponent } from '../../../../pages/admin/parent-list/cell-avatar/cell-avatar.component';
@Component({
  selector: 'ngx-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnChanges {
  @Input() data;
  @Output('onselect') onSelectEvent = new EventEmitter();
  searchWord:string;
  parents: User[] = [];
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
        renderComponent: CellAvatarComponent,
      }      
    },
  };
  purpose:string;
  constructor(private userService: UsersService, 
              private router: Router,
              private route:ActivatedRoute,) {
    this.parent_src = new LocalDataSource();
  }

  ngOnInit(): void {
    console.log(this.data);
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
    let selected_user:User = event.data;
    console.log(selected_user) 
    this.onSelectEvent.emit(selected_user);
  }

}