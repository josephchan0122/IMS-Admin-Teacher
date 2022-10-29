import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiniclubComponent } from './miniclub.component';
import { NewClubComponent } from './new-club/new-club.component';

const routes: Routes = [
  { path: '', component: MiniclubComponent },
  { path: 'new', component: NewClubComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiniclubRoutingModule { }
