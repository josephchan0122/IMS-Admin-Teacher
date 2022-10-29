import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { User, USERROLE } from '../../../@core/models/user';
import { CellAvatarComponent } from "../parent-list/cell-avatar/cell-avatar.component";
import { UsersService } from '../../../@core/services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ChildService } from '../../../@core/services/child.service';
import { Child } from '../../../@core/models/child';
@Component({
  selector: 'ngx-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  parents: User[] = [];
  teachers: User[] = [];
  children: Child[] = [];
  teacher_src: LocalDataSource;
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
  

  constructor(private userService: UsersService, 
    private childService:ChildService,
    private router:Router,
    private route:ActivatedRoute) {
    this.teacher_src = new LocalDataSource();
    this.parent_src = new LocalDataSource();
  }
  
  ngOnInit(): void {
    forkJoin({
      teachers:this.userService.getTeachers(),
      children:this.childService.getAllChildren(),
    }).subscribe(ret=>{
      this.teachers = ret.teachers;
      this.children = ret.children;
    })
  }

  onTeacherSelect(event){
    let selected_user:User = event;
    this.router.navigate([selected_user.id],{relativeTo:this.route});
  }
  onChildSelect(event){
    let selectedChild:Child = event;
    this.router.navigate([selectedChild.parent.id],{relativeTo:this.route});
  }

}
