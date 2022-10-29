import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchoolDocumentsComponent } from './school-documents.component';

const routes: Routes = [{ path: '', component: SchoolDocumentsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolDocumentsRoutingModule { }
