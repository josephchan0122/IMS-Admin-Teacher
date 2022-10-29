import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from "../services/users.service";
import { async } from '@angular/core/testing';
import { User, USERROLE } from "../models/user";
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private usersService:UsersService, public router: Router){
    
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise(async (resolve, reject)=>{
        this.usersService.getCurrentUser().subscribe((user:User) =>{
          const isAllowed = Boolean(next.data.role === user.role);
          if(!isAllowed)
            this.router.navigate(['/default']);
          resolve(isAllowed);
        });        
      });
  }
  
}
