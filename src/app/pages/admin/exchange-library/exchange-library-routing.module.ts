import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';

import { ExchangeLibraryComponent } from './exchange-library.component';

const routes: Routes = [
  { path: '', component: ExchangeLibraryComponent },
  { path: 'new', component: AddBookComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExchangeLibraryRoutingModule { }
