import { Component, ContentChild, Directive, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NbInputDirective } from '@nebular/theme';

export enum PwdIconName{
  show="eye",
  hide="eye-off"
}



@Component({
  selector: 'ngx-password-wrapper',
  templateUrl: './password-wrapper.component.html',
  styleUrls: ['./password-wrapper.component.scss']
})
export class PasswordWrapperComponent implements OnInit {
  @ContentChild(NbInputDirective, {read:ElementRef}) inputRef:ElementRef;  
  is_password_shown:boolean=false;
  password_icon_name=PwdIconName.show;  
  
  constructor() {     
  }

  ngOnInit(): void {
    console.log(this.inputRef)
  }
  onEyeClicked(){
    this.is_password_shown = !this.is_password_shown;
    if(this.is_password_shown) {
      this.password_icon_name = PwdIconName.hide;      
      this.inputRef.nativeElement.type = "text";
      
    }
    else {
      this.password_icon_name = PwdIconName.show;    
      this.inputRef.nativeElement.type = "password";
    }
  }
}
