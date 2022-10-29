import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ChildService } from '../services/child.service';
import { UsersService } from '../services/users.service';
import { User, USERROLE } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ClassRoomGuard implements CanActivate {
  constructor(
    private childService:ChildService,
    private usersService:UsersService,
    public router: Router
  ) {   
    
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise(async (resolve, reject)=>{
        this.usersService.getCurrentUser().subscribe((user:User) =>{
          let classname= this.childService.getCurrentClassName();
          let nameList = []
          if(user.role == USERROLE.Teacher){
            nameList = user.classNames;
          }
          if(user.role == USERROLE.Admin){
            nameList = this.childService.classNameList;
          }

          if(nameList.includes(classname)){
            resolve(true);
          } else{
            this.router.navigate(['/choose/classname']);
            resolve(false);
          }          
        });        
      });
    return true;
  }
  
}
