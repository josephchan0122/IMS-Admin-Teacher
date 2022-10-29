import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PicturesRoutingModule } from './pictures-routing.module';
import { PicturesComponent } from './pictures.component';
import { PictureListComponent } from './picture-list/picture-list.component';
import { NgxDropzoneModule } from "ngx-dropzone";
import { NgxFileUploadCoreModule } from "@ngx-file-upload/core";
import { NgxFileUploadUiProgressbarModule, NgxFileUploadUiCommonModule, NgxFileUploadUiToolbarModule } from "@ngx-file-upload/ui";
import { ChildListModule } from '../../../shared/child-list/child-list.module';
import { NbCardModule, NbButtonModule, NbIconModule, NbTooltipModule, NbUserModule } from '@nebular/theme';
import { PictureAddComponent } from './picture-add/picture-add.component';
import { SharedTranslateModule } from '../../../shared-translate/shared-translate.module';

@NgModule({
  declarations: [PicturesComponent, PictureListComponent, PictureAddComponent],
  imports: [
    CommonModule,
    PicturesRoutingModule,
    NbCardModule,
    ChildListModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
    NbCardModule,
    NbUserModule,
    SharedTranslateModule,
    NgxDropzoneModule,
    /**
     * !notice required import of NgxFileUploadCoreModule only in root of app
     */
    NgxFileUploadCoreModule,
    /**
     * NgxFileUploadUiCommonModule for pipes
     * NgxFileUploadUiProgressbarModule for circle progressbar
     * NgxFileUploadUiToolbarModule for toolbar
     */
    NgxFileUploadUiCommonModule,
    NgxFileUploadUiProgressbarModule,
    NgxFileUploadUiToolbarModule
  ]
})
export class PicturesModule { }
