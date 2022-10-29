import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PresetComponent } from './preset.component';

const routes: Routes = [{ path: '', component: PresetComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresetRoutingModule { }
