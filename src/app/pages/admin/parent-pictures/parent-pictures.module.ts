import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentPicturesRoutingModule } from './parent-pictures-routing.module';
import { ParentPicturesComponent } from './parent-pictures.component';
import { NbCardModule } from '@nebular/theme';
import { AddComponent } from './add/add.component';

import { NgxDropzoneModule } from "ngx-dropzone";
import { NgxFileUploadCoreModule } from "@ngx-file-upload/core";
import { NgxFileUploadUiProgressbarModule, NgxFileUploadUiCommonModule, NgxFileUploadUiToolbarModule } from "@ngx-file-upload/ui";

@NgModule({
  declarations: [ParentPicturesComponent, AddComponent],
  imports: [
    CommonModule,
    ParentPicturesRoutingModule,
    NbCardModule,
    
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
export class ParentPicturesModule { }
