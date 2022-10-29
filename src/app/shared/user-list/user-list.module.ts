import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { NbIconModule, NbButtonModule, NbInputModule } from '@nebular/theme';
import { SharedTranslateModule } from '../../shared-translate/shared-translate.module';



@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    FormsModule,
    NbInputModule,
    SharedTranslateModule,
    NbIconModule,
    NbButtonModule,
    Ng2SmartTableModule
  ],
  exports: [UserListComponent]
})
export class UserListModule { }
