import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as moment from "moment";
import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsComponent } from './appointments.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import { ParentListModule } from '../parent-list/parent-list.module';
import { SharedModule } from '../../../shared/shared.module';
import { AppointmentDetailComponent } from './appointment-detail/appointment-detail.component';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { NbCardModule, NbButtonModule, NbIconModule, NbUserModule, NbInputModule, NbSelectModule, NbTabsetModule, NbToastrModule, NbToggleModule, NbBadgeModule, NbTooltipModule } from '@nebular/theme';
import { AppointmentEditComponent } from './appointment-edit/appointment-edit.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from '@danielmoncada/angular-datetime-picker';
import { AppointmentPresetEditComponent } from './appointment-preset-edit/appointment-preset-edit.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppointmentCreateComponent } from './appointment-create/appointment-create.component';
import { PresetComponent } from './preset/preset.component';
import { PresetSlotItemComponent } from './preset-slot-item/preset-slot-item.component';
import { AppointmentPresetCreateComponent } from './appointment-preset-create/appointment-preset-create.component';
import { SharedTranslateModule } from '../../../shared-translate/shared-translate.module';
import { ChildListModule } from '../../../shared/child-list/child-list.module';
import { UserListModule } from '../../../shared/user-list/user-list.module';

export function momentAdapterFactory() {
  return adapterFactory(moment);
}


@NgModule({
  declarations: [AppointmentsComponent, AppointmentDetailComponent, CalendarHeaderComponent, AppointmentEditComponent, AppointmentPresetEditComponent, AppointmentCreateComponent, PresetComponent, PresetSlotItemComponent, AppointmentPresetCreateComponent],
  imports: [
    CommonModule,    
    SharedModule,
    AppointmentsRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: momentAdapterFactory,
    }),
    NbButtonModule,
    NbBadgeModule,
    NbIconModule,
    NbCardModule,
    NbUserModule,
    NbInputModule,
    NbTabsetModule,
    NbToastrModule,
    NbTooltipModule,
    NbSelectModule,
    NbToggleModule,    
    SharedTranslateModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ChildListModule,
    UserListModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class AppointmentsModule { }
