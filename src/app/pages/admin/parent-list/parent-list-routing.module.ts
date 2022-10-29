import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParentListComponent } from './parent-list.component';

const routes: Routes = [{ path: '', component: ParentListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentListRoutingModule { }
