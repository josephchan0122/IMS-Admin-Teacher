import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isInvalidControl } from "../../../@core/utils/form.util";
import { User } from "../../../@core/models/user";
import { UsersService } from "../../../@core/services/users.service";
import { MustMatch } from "../../../@core/utils/validators.util";
import { generateRandomPassword } from "../../../@core/utils/password.util";
import { NbToastrService } from '@nebular/theme';
import { ToastService } from '../../../@core/services/toast.service';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  passwordForm:FormGroup;
  errors:any;
  user:User;
  genereatedPwd:string;
  constructor(private fb: FormBuilder, private userService:UsersService, private toastrService:ToastService) { }

  ngOnInit(): void {
    this.genereatedPwd = generateRandomPassword(12);
    this.profileForm = this.fb.group({
      first_name:['', Validators.required],
      last_name:['', Validators.required],
      email:['', [Validators.email, Validators.required]],
      username:['',Validators.required],
      phoneNumber:'',
      address:'',
      picture:[''],
      pictureFile:['']
    });
    this.passwordForm = this.fb.group({
      current_pwd:['', Validators.required],
      pwd:['', Validators.required],
      confirm_pwd:['']
    },{ validators:[MustMatch('pwd', 'confirm_pwd')] });
    
    this.userService.getCurrentUser().subscribe((user:User)=>{
      this.user = user;
      this.profileForm.reset(this.user);
    })
    

    
  }
  onProfileSubmit(){
    this.profileForm.markAllAsTouched();
    if(this.profileForm.valid){
      if(this.profileForm.value['picture'] == this.user.picture){
        let data = Object.assign({}, this.profileForm.value)
        data['picture']=undefined;
        data['id'] = this.user.id;
        this.userService.patchUser(data).subscribe(
          _=>{this.toastrService.success('User Info updated Succesfully','success');},
          err=>{
            this.errors = err.error;
            Object.keys(this.errors).forEach(key=>{
              if(key!='picture')
                this.profileForm.get(key).setErrors({hostError:true})
            })  
          }
        )
      }else{
        let user:User = Object.assign(this.user, this.profileForm.value);
        this.userService.updateUser(user, this.profileForm.get('pictureFile').value).subscribe(
          _=>{
            this.toastrService.success('User Info updated Succesfully','success');
          },
          err=>{
            this.errors = err.error;
            Object.keys(this.errors).forEach(key=>{
              if(key!='picture')
                this.profileForm.get(key).setErrors({hostError:true})
            })              
          }
        )
      }
      
      

    }
  }
  onPasswordSubmit(){
    this.passwordForm.markAllAsTouched();
    if(this.passwordForm.valid){
      let new_pwd = this.passwordForm.value['pwd'];
      let current_pwd = this.passwordForm.value['current_pwd']
      this.userService.setCurrentUserPassword(new_pwd, current_pwd).subscribe(
        data=>{
          this.toastrService.success("Password has been changed successfully","success");
        },
        err=> {
          this.errors = err.error;
          if('current_pwd' in this.errors){
            this.passwordForm.get('current_pwd').setErrors({'incorrect':true});
          }
        }
      )
    }
  }
  setPassword(elem){
    elem.select()
    elem.setSelectionRange(0, 99999);
    document.execCommand("copy");
    this.passwordForm.get('pwd').setValue(this.genereatedPwd);
    this.passwordForm.get('confirm_pwd').setValue(this.genereatedPwd);
    this.toastrService.show(this.genereatedPwd, 'Password Copied');
  }
  changeListener(event):void {
    console.log(event);
    if(event.target.files && event.target.files[0]){
      let reader = new FileReader();

      reader.onload = (event:any) => {
        this.profileForm.get('picture').setValue(event.target.result);        
      }
      this.profileForm.get('pictureFile').setValue(event.target.files[0]);
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  get picture():string { return this.profileForm.get('picture').value}
  isInvalidControl = isInvalidControl;

}
