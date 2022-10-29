import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildListComponent } from './child-list/child-list.component';
import { ChildCellComponent } from './child-cell/child-cell.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { NbIconModule, NbButtonModule, NbInputModule, NbUserModule, NbCardModule } from '@nebular/theme';
import { ChildSelectComponent } from './child-select/child-select.component';
import { ChildCellWithCheckboxComponent } from './child-cell-with-checkbox/child-cell-with-checkbox.component';
import { SharedTranslateModule } from '../../shared-translate/shared-translate.module';




@NgModule({
  declarations: [ChildListComponent, ChildCellComponent, ChildSelectComponent, ChildCellWithCheckboxComponent],
  imports: [
    CommonModule,
    FormsModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbInputModule,
    NbIconModule,
    NbButtonModule,
    NbUserModule,
    SharedTranslateModule,
    Ng2SmartTableModule,
  ],
  exports:[
    ChildListComponent,
    ChildSelectComponent
  ]
})
export class ChildListModule { }
