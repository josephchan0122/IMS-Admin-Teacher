import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarketingComponent } from './marketing.component';

const routes: Routes = [{ path: '', component: MarketingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketingRoutingModule { }
