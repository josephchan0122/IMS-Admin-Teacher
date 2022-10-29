import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { NbMenuModule, 
  NbCardModule,   
  NbInputModule,
  NbIconModule,
  NbPopoverModule,
  NbButtonModule,
  NbUserModule,
  NbListModule,
  NbTabsetModule,
  NbTooltipModule,
  NbSelectModule} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CellAvatarComponent } from './cell-avatar/cell-avatar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUserComponent  } from './add-user/add-user.component';
import { SharedTranslateModule } from '../../../shared-translate/shared-translate.module';

@NgModule({
  declarations: [UsersComponent, CellAvatarComponent,AddUserComponent],
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    UsersRoutingModule,
    NbListModule,
    NbTabsetModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbUserModule,
    NbTooltipModule,
    NbInputModule,
    NbSelectModule,
    NbPopoverModule ,
    FormsModule,
    SharedTranslateModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
