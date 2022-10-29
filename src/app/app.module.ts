/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpBackend, HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule, TranslatePipe} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'ws://localhost:8000/ws/notification/', options: {autoConnect:false} };

registerLocaleData(localeFr)

import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbStepperModule,
  NbButtonModule,
  NbWindowModule,
  NbTooltipModule,
  NbCardModule,
  NbInputModule,
  NbIconModule,
} from '@nebular/theme';

import { AuthInterceptor } from './auth.interceptor';
import { YesNoDialogComponent } from './components/yes-no-dialog/yes-no-dialog.component';
import { LightboxModule } from 'ngx-lightbox';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';


export function momentAdapterFactory() {
  return adapterFactory(moment);
};


@NgModule({
  declarations: [AppComponent, YesNoDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ThemeModule.forRoot(),
    
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbTooltipModule,
    NbCardModule,    
    NbButtonModule,
    NbInputModule,    
    // OwlDateTimeModule,
    // OwlNativeDateTimeModule,
    CoreModule.forRoot(),
    LightboxModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: TranslationLoaderFactory,
          deps: [HttpBackend]
      },
      defaultLanguage:'en',
      useDefaultLang:true
    }),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory }),
    // SocketIoModule.forRoot(config)
  ],
  providers:[
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent],
})

export class AppModule {
}

export function TranslationLoaderFactory(httpBackend: HttpBackend) {
  return new TranslateHttpLoader(new HttpClient(httpBackend), './assets/i18n/', '.json');
}
