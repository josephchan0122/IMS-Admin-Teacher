import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../@core/services/users.service';
import { User, USERROLE } from '../../@core/models/user';
import { NbMenuService } from '@nebular/theme';

@Component({
  selector: 'ngx-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  constructor(private usersSerivce:UsersService, private menuSerivce:NbMenuService) { }

  ngOnInit(): void {
    this.menuSerivce.navigateHome();
  }

}
