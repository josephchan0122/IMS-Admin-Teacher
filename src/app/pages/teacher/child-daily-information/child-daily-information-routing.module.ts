import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChildDailyInformationComponent } from './child-daily-information.component';
import { DailyDetailComponent } from './daily-detail/daily-detail.component';

const routes: Routes = [
  { path: '', component: ChildDailyInformationComponent },
  { path: ':childId', component: DailyDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChildDailyInformationRoutingModule { }
