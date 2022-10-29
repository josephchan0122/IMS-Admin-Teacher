/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { NbIconLibraries } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'ngx-app',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService,
    private iconsLibrary: NbIconLibraries,
    private translateService:TranslateService
    ) {
    this.iconsLibrary.registerFontPack('fa',{ packClass: 'fa', iconClassPrefix: 'fa' })
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }

  ngOnInit() {
    this.analytics.trackPageViews();
  }
}
