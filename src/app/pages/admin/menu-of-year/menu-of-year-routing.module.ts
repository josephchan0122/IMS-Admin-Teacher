import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuOfYearComponent } from './menu-of-year.component';
import { AddFoodComponent } from './add-food/add-food.component';
import { EditFoodComponent } from './edit-food/edit-food.component';

const routes: Routes = [
  { path: 'food/new', component: AddFoodComponent},
  { path: 'food/edit/:food_id', component:EditFoodComponent},
  
  { path: '', component: MenuOfYearComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuOfYearRoutingModule { }
