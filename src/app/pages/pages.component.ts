import { Component, OnDestroy } from '@angular/core';

import { MENU_ITEMS, TEACHER_MENU_ITEMS } from './pages-menu';
import { TranslateService } from '@ngx-translate/core';
import { UsersService } from '../@core/services/users.service';
import { User, USERROLE } from '../@core/models/user';
import { UserService } from '../@core/mock/users.service';
import { NotificationService } from '../@core/services/notification.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IMSNotification } from '../@core/models/notification';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnDestroy{

  menu;
  private destroy$: Subject<void> = new Subject<void>();
  notifications:IMSNotification[]=[];
  constructor(
    private translateService: TranslateService, 
    private userService:UsersService,
    private notificationService:NotificationService
    ) {
    
    this.menu=[];
    this.notificationService.connect();
    this.userService.getCurrentUser().subscribe((user:User) => {
      if( user.role === USERROLE.Admin)
        this.menu = MENU_ITEMS;
      if( user.role === USERROLE.Teacher)
        this.menu = TEACHER_MENU_ITEMS;
      this._TranslateMenu();
    })
    
  }
  _TranslateMenu(){
    for (const each of this.menu ) {
      this.translateService.stream(each.title).subscribe(res => {
        each.title = res;
      });
      if (each.children) {
        for (const eachChild of each.children) {
          this.translateService.stream(eachChild.title).subscribe(res => {
            eachChild.title = res;
          });
        }
      }
    }
  }
  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }
}
