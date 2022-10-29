import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChildDailyInformationRoutingModule } from './child-daily-information-routing.module';
import { ChildDailyInformationComponent } from './child-daily-information.component';
import { NbCardModule, NbUserModule, NbIconModule, NbButtonModule, NbSelectModule, NbInputModule, NbToggleModule, NbToastrService, NbToastrModule, NbTooltipModule } from '@nebular/theme';
import { ChildListModule } from '../../../shared/child-list/child-list.module';
import { DailyDetailComponent } from './daily-detail/daily-detail.component';
import { NbUser } from '@nebular/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { FoodComponent } from './food/food.component';
import { SharedTranslateModule } from '../../../shared-translate/shared-translate.module';


@NgModule({
  declarations: [ChildDailyInformationComponent, DailyDetailComponent, FoodComponent],
  imports: [
    CommonModule,
    ChildDailyInformationRoutingModule,
    NbCardModule,
    NbUserModule,
    NbIconModule,
    NbButtonModule,
    NbToggleModule,
    NbToastrModule,
    NbSelectModule,
    NbInputModule,
    NbTooltipModule,
    ChildListModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SharedTranslateModule,
    ReactiveFormsModule
  ]
})
export class ChildDailyInformationModule { }
