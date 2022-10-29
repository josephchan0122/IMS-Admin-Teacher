import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChildrenRoutingModule } from './children-routing.module';
import { ChildrenComponent } from './children.component';
import { ChildListModule } from '../../../shared/child-list/child-list.module';
import { NbCardModule, NbButtonModule, NbIconModule, NbTooltipModule, NbUserModule, NbInputModule, NbPopoverModule, NbSelectModule } from '@nebular/theme';
import { ChildDetailComponent } from './child-detail/child-detail.component';
import { AddSiblingComponent } from './add-sibling/add-sibling.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedTranslateModule } from '../../../shared-translate/shared-translate.module';
import { SetChildPWDComponent } from './set-child-pwd/set-child-pwd.component';
import { AddChildComponent } from './add-child/add-child.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';


@NgModule({
  declarations: [ChildrenComponent, ChildDetailComponent, AddSiblingComponent, SetChildPWDComponent, AddChildComponent],
  imports: [
    CommonModule,
    ChildrenRoutingModule,
    ChildListModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbUserModule,
    NbPopoverModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SharedTranslateModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ChildrenModule { }
