import { Component, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';

import { AuthService } from '../auth.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-auth',
  styleUrls: ['./auth.component.scss'],
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {

  private alive = true;

  subscription: any;

  authenticated: boolean = false;
  token: string = '';

  // showcase of how to use the onAuthenticationChange method
  constructor(protected auth: AuthService, protected location: Location) {
  }

  back() {
    this.location.back();
    return false;
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}