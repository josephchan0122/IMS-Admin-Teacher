import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationComponent } from './notification.component';
import { SendNotificationComponent } from './send-notification/send-notification.component';
import { NbCardModule, NbButtonModule, NbInputModule, NbCheckboxModule, NbListModule, NbIconModule, NbTooltipModule, NbUserModule, NbBadgeModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { SharedTranslateModule } from '../../../shared-translate/shared-translate.module';
import { NotificationDetailComponent } from './notification-detail/notification-detail.component';


@NgModule({
  declarations: [NotificationComponent, SendNotificationComponent, NotificationDetailComponent],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    NbCardModule,
    NbIconModule,
    NbTooltipModule,
    NbButtonModule,
    NbInputModule,
    NbListModule,        
    NbUserModule,
    NbBadgeModule,
    NbCheckboxModule,
    ReactiveFormsModule,
    FormsModule,    
    SharedModule,
    SharedTranslateModule
  ]
})
export class NotificationModule { }
