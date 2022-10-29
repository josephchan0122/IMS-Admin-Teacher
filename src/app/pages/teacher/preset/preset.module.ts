import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresetRoutingModule } from './preset-routing.module';
import { PresetComponent } from './preset.component';
import { NbBadgeModule, NbButtonModule, NbCardModule, NbIconModule, NbListModule, NbUserModule } from '@nebular/theme';
import { SharedTranslateModule } from '../../../shared-translate/shared-translate.module';


@NgModule({
  declarations: [PresetComponent],
  imports: [
    CommonModule,
    NbListModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbUserModule,
    NbBadgeModule,
    SharedTranslateModule,
    PresetRoutingModule
  ]
})
export class PresetModule { }
