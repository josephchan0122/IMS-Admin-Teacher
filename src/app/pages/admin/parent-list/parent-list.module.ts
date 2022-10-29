import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentListRoutingModule } from './parent-list-routing.module';
import { CellAvatarComponent } from './cell-avatar/cell-avatar.component';
import { ParentListComponent } from './parent-list.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { 
  NbCardModule,   

  NbIconModule,

  NbButtonModule,
  NbUserModule,
  NbListModule,
  NbTabsetModule,
  NbTooltipModule} from '@nebular/theme';

@NgModule({
  declarations: [ParentListComponent, CellAvatarComponent],
  imports: [
    CommonModule,
    ParentListRoutingModule,
    Ng2SmartTableModule,
    NbListModule,
    NbTabsetModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbUserModule,
    NbTooltipModule,
  ],
  exports:[
    ParentListComponent
  ]
})
export class ParentListModule { }
