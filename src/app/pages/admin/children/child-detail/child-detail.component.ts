import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChildService } from '../../../../@core/services/child.service';
import { switchMap } from 'rxjs/operators';
import { Child } from '../../../../@core/models/child';
import { UsersService } from '../../../../@core/services/users.service';
import { User, USERROLE } from '../../../../@core/models/user';
import { NbDialogService } from '@nebular/theme';
import { YesNoDialogComponent } from '../../../../components/yes-no-dialog/yes-no-dialog.component';
import { group } from 'console';
import { ToastService } from '../../../../@core/services/toast.service';

@Component({
  selector: 'ngx-child-detail',
  templateUrl: './child-detail.component.html',
  styleUrls: ['./child-detail.component.scss']
})
export class ChildDetailComponent implements OnInit {
  childId:number;
  currentUser:User;
  child:Child;
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private userService:UsersService,
    private childService:ChildService,
    private toastService:ToastService,
    private dialogService:NbDialogService
  ) { 
    this.userService.getCurrentUser().subscribe((user:User)=>{this.currentUser = user;})
    this.route.paramMap.pipe(switchMap(
      params => {
        this.childId = Number(params.get('childId'));
        return this.childService.getChildById(this.childId);
      }
    )).subscribe((child:Child) => {
      
      this.child = child;
    })
  }

  ngOnInit(): void {

  }
  onSiblingClick(sibling:Child){
    this.router.navigate([`../${sibling.id}`],{relativeTo:this.route});
  }
  onRemoveSiblingClick(){
    this.dialogService.open(YesNoDialogComponent,{context:{
      title:'This child will be removed from sibling. Are you going to continue?'
    }}).onClose.subscribe(ret=>{
      if(ret==true)
        this.childService.RemoveChildFromSibling(this.child).subscribe( groupId=>{
          this.child.sibling_group = groupId;
          this.child.siblings=[];          
        })
    })
  }
  onAddSiblingClick(){
    this.router.navigate(['addsiblings'],{relativeTo:this.route});
  }
  onSetPWDClick(){
    this.router.navigate(['setpwd'],{relativeTo:this.route});
  }
  
  back(){
    this.router.navigate(['/children']);
  }
  isTeacher(){
    return this.currentUser.role == USERROLE.Teacher;
  }
  getPhotoOfChild(){
    if(this.child)
      return this.child.photo? this.child.photo:'';
    return '';
  }
  isAdmin(user:User){
    return user.role == USERROLE.Admin;
  }
  onDelete(){
    this.dialogService.open(YesNoDialogComponent,{context:{
      title:'Are you sure?'
    }}).onClose.subscribe(ret=>{
      if(ret==true)
        this.childService.deleteChild(this.childId).subscribe(_=>{
          this.toastService.warning('Child has been deleted','Delete');
          this.router.navigate(['..'],{relativeTo:this.route});
        })
    })    
  }

}
