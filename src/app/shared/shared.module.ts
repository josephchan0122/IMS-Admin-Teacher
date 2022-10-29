import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReplyComponent } from './components/reply/reply.component';
import { NbCardModule, NbButtonModule, NbIconModule, NbInputModule, NbTooltipModule, NbUserModule, NbAutocompleteModule, NbDialogModule } from '@nebular/theme';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxFileUploadUiCommonModule, NgxFileUploadUiProgressbarModule } from '@ngx-file-upload/ui';
import { TagInputModule } from "ngx-chips";
import { TagInputComponent } from './components/tag-input/tag-input.component';
import { UserSelectComponent } from './components/user-select/user-select.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CellAvatarWithCheckBoxComponent } from './components/user-select/cell-avatar-with-check-box/cell-avatar-with-check-box.component';
import { SharedTranslateModule } from '../shared-translate/shared-translate.module';
import { PasswordWrapperComponent } from './components/password-wrapper/password-wrapper.component';
@NgModule({
  declarations: [ReplyComponent, TagInputComponent, UserSelectComponent, CellAvatarWithCheckBoxComponent, PasswordWrapperComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
    NbInputModule,
    NbUserModule,
    ReactiveFormsModule,    
    FormsModule,
    NbAutocompleteModule,
    NgxDropzoneModule,
    NgxFileUploadUiCommonModule,
    NgxFileUploadUiProgressbarModule,
    TagInputModule,
    SharedTranslateModule,
    Ng2SmartTableModule,
    FormsModule,
    NbDialogModule.forChild()
  ],
  exports: [
    PasswordWrapperComponent,
    ReplyComponent, 
    TagInputComponent,
    UserSelectComponent
  ]
})
export class SharedModule { }
