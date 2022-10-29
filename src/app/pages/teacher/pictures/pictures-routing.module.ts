import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PicturesComponent } from './pictures.component';
import { PictureListComponent } from './picture-list/picture-list.component';
import { PictureAddComponent } from './picture-add/picture-add.component';

const routes: Routes = [
  { path: '', component: PicturesComponent },
  { path:':childId/add', component:PictureAddComponent},
  { path:':childId', component:PictureListComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PicturesRoutingModule { }
