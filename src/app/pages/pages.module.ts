import { NgModule } from '@angular/core';
import { NbMenuModule, 
  NbStepperModule, 
  NbCardModule, 
  NbInputModule,
  NbSelectModule,
  NbButtonModule,  
  NbTooltipModule,
  NbIconModule,
  NbDialogModule,
  NbListModule,
  NbCheckboxModule} from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './admin/dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SharedTranslateModule } from '../shared-translate/shared-translate.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NotFoundComponent } from './not-found/not-found.component';
import { DefaultComponent } from './default/default.component';
import { NotAllowedComponent } from './not-allowed/not-allowed.component';
import { AdminModule } from './admin/admin.module';
import { ChooseClassNameComponent } from './choose-class-name/choose-class-name.component';
import { NotificationComponent } from './notification/notification.component';
@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ReactiveFormsModule,
    FormsModule,
    NbStepperModule,
    NbCardModule,
    NbListModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
    NbTooltipModule,
    NbIconModule,       
    NbDialogModule, 
    NbCheckboxModule,
    SharedTranslateModule, 
    AdminModule,
    
  ],
  declarations: [
    PagesComponent,
    NotFoundComponent,
    DefaultComponent,
    NotAllowedComponent,
    ChooseClassNameComponent,
    NotificationComponent,
  ],
})
export class PagesModule {
}
