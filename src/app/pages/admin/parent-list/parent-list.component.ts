import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { User, USERROLE } from "../../../@core/models/user";
import { UsersService } from "../../../@core/services/users.service";
import { LocalDataSource } from 'ng2-smart-table';
import { CellAvatarComponent } from './cell-avatar/cell-avatar.component';
@Component({
  selector: 'ngx-parent-list',
  templateUrl: './parent-list.component.html',
  styleUrls: ['./parent-list.component.scss']
})
export class ParentListComponent implements OnInit, OnChanges {
  @Input('listType') _listType:string;

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

  ngOnChanges(change) {
    console.log( change );
    console.log(this._listType)
    console.log(this.purpose)
  }

  ngOnInit(): void {
    console.log('userId is:',this._listType);
    this.userService.getParents().subscribe((users:User[])=>{
      this.parents = users;     
      this.parent_src.load(this.parents);
    })
    this.route.paramMap.subscribe(params=>{
      this.purpose = params.get('purpose');
    })
  }

  onRowSelect(event) {
    let selected_user:User = event.data;
    console.log(this._listType)
    console.log(this.purpose)
    if(this.purpose == 'pictures'){
      this.router.navigate([selected_user.id],{relativeTo:this.route});
    }
    else if(this._listType == 'Appointment'){
      this.router.navigate([selected_user.id],{relativeTo:this.route});
    }
    
    
    console.log(selected_user) 
  }

}
