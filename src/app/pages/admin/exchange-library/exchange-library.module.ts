import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExchangeLibraryRoutingModule } from './exchange-library-routing.module';
import { ExchangeLibraryComponent } from './exchange-library.component';
import { AddBookComponent } from './add-book/add-book.component';
import { BookFormComponent } from './book-form/book-form.component';
import { NbAccordionModule, NbAlertModule, NbBadgeModule, NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbListModule, NbTooltipModule, NbUserModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedTranslateModule } from '../../../shared-translate/shared-translate.module';

@NgModule({
  declarations: [ExchangeLibraryComponent, AddBookComponent, BookFormComponent],
  imports: [
    CommonModule,
    CommonModule,
    NbCardModule,
    NbInputModule,
    NbListModule,
    FormsModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
    NbAccordionModule,
    NbUserModule,
    NbBadgeModule,

    SharedTranslateModule,
    ExchangeLibraryRoutingModule
  ]
})
export class ExchangeLibraryModule { }
