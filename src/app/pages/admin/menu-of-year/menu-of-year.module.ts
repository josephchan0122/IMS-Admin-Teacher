import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuOfYearRoutingModule } from './menu-of-year-routing.module';
import { MenuOfYearComponent } from './menu-of-year.component';
import { FoodFormComponent } from "./food-form/food-form.component";
import { NbCardModule, NbIconModule, NbToastrModule, NbInputModule, NbButtonModule, NbSelectModule, NbTooltipModule } from '@nebular/theme';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddFoodComponent } from './add-food/add-food.component';
import { EditFoodComponent } from './edit-food/edit-food.component';
import { FoodComponent } from './food/food.component';
import { FoodListComponent } from './food-list/food-list.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FoodCellComponent } from './food-list/food-cell/food-cell.component';
import { SharedTranslateModule } from '../../../shared-translate/shared-translate.module';


@NgModule({
  declarations: [MenuOfYearComponent,FoodFormComponent,AddFoodComponent,EditFoodComponent, FoodComponent, FoodListComponent, FoodCellComponent],
  imports: [
    CommonModule,
    MenuOfYearRoutingModule,
    NbCardModule,
    NbIconModule,
    NbToastrModule,
    NbInputModule,
    NbButtonModule,
    NbTooltipModule,
    NbSelectModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    SharedTranslateModule,
    FormsModule
  ],
})
export class MenuOfYearModule { }
