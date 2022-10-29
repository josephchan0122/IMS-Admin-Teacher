import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { UsersService } from "../../../@core/services/users.service";
import { User, USERROLE } from "../../../@core/models/user";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isInvalidControl } from "../../../@core/utils/form.util";
import { MustMatch } from "../../../@core/utils/validators.util";
import { generateRandomPassword } from "../../../@core/utils/password.util";
import { NbToastrService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { NameOfClass } from '../../../@core/models/child';
import { ChildService } from '../../../@core/services/child.service';
import { ToastService } from '../../../@core/services/toast.service';
@Component({
  selector: 'ngx-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  userId: number;
  user:User;
  profileForm: FormGroup;
  passwordForm:FormGroup;  
  genereatedPwd:string;
  classNameList:NameOfClass[];
  errors:any;

  private destroy$:Subject<void>=new Subject<void>();

  constructor(private route:ActivatedRoute,
    private childService:ChildService,
    private fb: FormBuilder, 
    private userService:UsersService, 
    private toastrService:ToastService) { }

  ngOnInit(): void {
    this.genereatedPwd = generateRandomPassword(12);
    console.log(this.genereatedPwd)
    this.classNameList = this.childService.classNameList;
    this.profileForm = this.fb.group({
      first_name:['', Validators.required],
      last_name:['', Validators.required],
      email:['', [Validators.email, Validators.required]],
      username:['',Validators.required],
      picture:[''],
      pictureFile:[''],
    });
    
    this.passwordForm = this.fb.group({
      pwd:['', Validators.required],
      confirm_pwd:['']
    },{ validators:[MustMatch('pwd', 'confirm_pwd')] });

    this.route.paramMap.pipe(switchMap(
      params => {
        this.userId = Number(params.get('id'));
        return this.userService.getUserById(this.userId);
      }
    )).pipe(takeUntil(this.destroy$)).subscribe((user:User) => {
      this.user = user;
      console.log(this.user);
      this.profileForm.reset(user);
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
      this.userService.setUserPassword(this.user.id, new_pwd).subscribe(
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
  onUpdateClassroom(){
    this.userService.patchUser({
      id:this.user.id,
      classNames:this.user.classNames
    }).subscribe(_=>{
      this.toastrService.success("Classroom has been updated successfully","success");
    })
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
  classroomChange(checked:boolean, name:NameOfClass){
    console.log(checked,name);
    if(this.user.role != USERROLE.Teacher) return;
    if(!this.user.classNames) this.user.classNames=[];
    
    if(!this.user.classNames.includes(name))
    {
      if(checked) this.user.classNames.push(name);  
    }else{
      if(!checked){
        this.user.classNames= this.user.classNames.reduce((item1:any[], item2)=>{ 
          if (item2 != name )
            item1.push(item2)
          return item1;
        },[])
      }
    }
    console.log(this.user.classNames)
  }
  get picture():string { 
    if(!this.profileForm.get('picture').value)
      return '';
    return this.profileForm.get('picture').value
  }
  isInvalidControl = isInvalidControl;
  ngOnDestroy() {    
    this.destroy$.next();
    this.destroy$.complete();
  }
}
