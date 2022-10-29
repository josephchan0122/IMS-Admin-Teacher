import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParentPicturesComponent } from './parent-pictures.component';
import { AddComponent } from "./add/add.component";
const routes: Routes = [
  { path: '', component: ParentPicturesComponent },
  { path: 'add', component: AddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentPicturesRoutingModule { }
