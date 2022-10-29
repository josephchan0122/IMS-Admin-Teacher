import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageCenterRoutingModule } from './message-center-routing.module';
import { MessageCenterComponent } from './message-center.component';
import { NbCardModule, NbListModule, NbButtonModule, NbIconModule, NbTooltipModule } from '@nebular/theme';
import { MessageDetailComponent } from "./message-detail/message-detail.component";
import { SharedModule } from "../../../shared/shared.module";
import { ComposeMessageComponent } from './compose-message/compose-message.component';
import { SharedTranslateModule } from '../../../shared-translate/shared-translate.module';

@NgModule({
  declarations: [MessageCenterComponent, MessageDetailComponent, ComposeMessageComponent],
  imports: [
    CommonModule,
    MessageCenterRoutingModule,
    NbCardModule,
    NbListModule,
    NbButtonModule,
    NbTooltipModule,
    SharedModule   ,
    NbIconModule,
    SharedTranslateModule, 
  ]
})
export class MessageCenterModule { }

