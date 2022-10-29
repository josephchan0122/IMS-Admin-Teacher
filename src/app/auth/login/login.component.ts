import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../auth.service";
import { UsersService } from '../../@core/services/users.service';
import { NbMenuService } from '@nebular/theme';

enum PwdIconName{
  show="eye",
  hide="eye-off"
}

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  rememberMe = false;
  is_password_shown:boolean=false;
  password_icon_name=PwdIconName.show;
  pwdType:string="password";

  constructor(protected service: AuthService,protected router: Router, private userService:UsersService) { }

  ngOnInit(): void {
    this.is_password_shown = false;
    this.password_icon_name = PwdIconName.show;
    this.pwdType = "password";
  }

  login(): void {
    this.errors = [];
    this.messages = [];    
    let user = this.user;
    this.submitted=true;
    this.service.login(user.email,user.password).subscribe((res:any) => {
      console.log(res);
      localStorage.setItem('access_token', res.token)
      this.userService.current_user = undefined;
      this.userService.getCurrentUser().toPromise().then(_=>{
        this.router.navigate(['/default'])
        this.submitted = false;
      })
      
      this.submitted=true;
    },
    (error:any)=>{
      console.log(error);
      console.log("====================")
      this.submitted=false;
      this.errors=['login failed']
      this.showMessages['error']=true
    }
    );
  }
  onEyeClicked(){
    this.is_password_shown = !this.is_password_shown;
    if(this.is_password_shown) {
      this.password_icon_name = PwdIconName.hide;
      this.pwdType = "text";
    }
    else {
      this.password_icon_name = PwdIconName.show;    
      this.pwdType = "password";
    }
  }
}
