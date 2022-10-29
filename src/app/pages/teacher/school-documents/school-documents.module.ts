import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolDocumentsRoutingModule } from './school-documents-routing.module';
import { SchoolDocumentsComponent } from './school-documents.component';
import { NbCardModule, NbListModule, NbTooltipModule, NbButtonModule, NbIconModule } from '@nebular/theme';
import { SharedTranslateModule } from '../../../shared-translate/shared-translate.module';


@NgModule({
  declarations: [SchoolDocumentsComponent],
  imports: [
    CommonModule,
    SchoolDocumentsRoutingModule,
    NbCardModule,
    NbListModule,
    NbTooltipModule,
    NbButtonModule,
    NbIconModule,
    SharedTranslateModule,
  ]
})
export class SchoolDocumentsModule { }
