import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbLayoutModule,
  NbInputModule,
  NbIconModule,
} from '@nebular/theme';
import { NbAuthModule } from '@nebular/auth';
import { SharedTranslateModule } from '../shared-translate/shared-translate.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [LoginComponent, AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbAuthModule,
    NbLayoutModule,
    SharedTranslateModule,
    NbIconModule,
    SharedModule
  ]
})
export class AuthModule { }
