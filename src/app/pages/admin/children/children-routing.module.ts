import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChildrenComponent } from './children.component';
import { ChildDetailComponent } from './child-detail/child-detail.component';
import { AddSiblingComponent } from './add-sibling/add-sibling.component';
import { SetChildPWDComponent } from './set-child-pwd/set-child-pwd.component';
import { RoleGuard } from '../../../@core/guards/role.guard';
import { USERROLE } from '../../../@core/models/user';
import { AddChildComponent } from './add-child/add-child.component';

const routes: Routes = [
  { path: '', component: ChildrenComponent },
  { path: 'new', component: AddChildComponent, canActivate:[RoleGuard],data: {role: USERROLE.Admin} },
  { path: ':childId/addsiblings', component: AddSiblingComponent, canActivate:[RoleGuard],data: {role: USERROLE.Admin}  },
  { path: ':childId/setpwd', component: SetChildPWDComponent , canActivate:[RoleGuard],data: {role: USERROLE.Admin} },
  { path: ':childId', component: ChildDetailComponent },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChildrenRoutingModule { }
