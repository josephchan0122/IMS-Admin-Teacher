import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketingRoutingModule } from './marketing-routing.module';
import { MarketingComponent } from './marketing.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbListModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { SharedTranslateModule } from '../../../shared-translate/shared-translate.module';


@NgModule({
  declarations: [MarketingComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbListModule,
    FormsModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,
    SharedTranslateModule,
    MarketingRoutingModule
  ]
})
export class MarketingModule { }
