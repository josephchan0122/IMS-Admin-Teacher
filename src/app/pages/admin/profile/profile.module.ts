import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NbMenuModule, 
  NbCardModule,   
  NbInputModule,
  NbIconModule,
  NbPopoverModule,
  NbButtonModule} from '@nebular/theme';
import { SharedTranslateModule } from '../../../shared-translate/shared-translate.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NbCardModule,
    NbInputModule,
    NbIconModule,
    NbButtonModule,
    NbPopoverModule ,
    SharedModule,
    SharedTranslateModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
