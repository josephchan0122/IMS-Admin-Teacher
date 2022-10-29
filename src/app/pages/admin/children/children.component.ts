import { Component, OnInit } from '@angular/core';
import { Child, NameOfClass } from '../../../@core/models/child';
import { ChildService } from '../../../@core/services/child.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../@core/services/users.service';
import { User, USERROLE } from '../../../@core/models/user';


@Component({
  selector: 'ngx-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss']
})
export class ChildrenComponent implements OnInit {
  children:Child[];
  currentClassName:NameOfClass;
  currentUser:User;
 
  constructor(
    private childService:ChildService,
    private userService:UsersService,
    private router:Router,
    private route:ActivatedRoute
    ) {
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(data=>{this.currentUser=data})
    this.currentClassName = this.childService.getCurrentClassName();
    this.childService.getChildrenByClassName(this.currentClassName).subscribe(data=>{
      this.children = data;
    })
  }
  onSelect(selectedChild:Child){
    this.router.navigate([selectedChild.id],{relativeTo:this.route})
  }
  onNewChild(){
    this.router.navigate(['new'],{relativeTo:this.route});
  }
  isAdmin(user:User){
    if (!user) return false;
    return user.role == USERROLE.Admin;
  }
}
