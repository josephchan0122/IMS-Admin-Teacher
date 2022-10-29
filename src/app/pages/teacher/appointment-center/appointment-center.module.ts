import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';

import { AppointmentCenterRoutingModule } from './appointment-center-routing.module';
import { AppointmentCenterComponent } from './appointment-center.component';
import { FormsModule } from '@angular/forms';
import { NbCardModule, NbToggleModule, NbButtonModule, NbBadgeModule, NbUserModule, NbInputModule, NbIconModule, NbCheckboxModule, NbStepperModule, NbTooltipModule } from '@nebular/theme';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { RequestMeetingComponent } from './request-meeting/request-meeting.component';
import { SharedTranslateModule } from '../../../shared-translate/shared-translate.module';
import { ChildListModule } from '../../../shared/child-list/child-list.module';


@NgModule({
  declarations: [AppointmentCenterComponent, ConfirmDialogComponent, RequestMeetingComponent],
  imports: [
    CommonModule,
    AppointmentCenterRoutingModule,
    NbCardModule,
    NbCheckboxModule,
    NbTooltipModule,
    NbButtonModule,
    NbBadgeModule,
    NbUserModule,
    NbInputModule,
    NbIconModule,
    ChildListModule,
    SharedTranslateModule,
    FormsModule,
    OwlDateTimeModule,     
    OwlNativeDateTimeModule,
  ]
})
export class AppointmentCenterModule { }
