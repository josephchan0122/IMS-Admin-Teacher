import { Component, OnInit, Input, TemplateRef, forwardRef, Output, OnChanges, SimpleChanges } from '@angular/core';
import { User, USERROLE } from "../../../@core/models/user";
import { unknown_picture } from "../../../@core/services/users.service";
import { LocalDataSource } from 'ng2-smart-table';
import { users } from '../../../@core/dummy';
import { NbDialogService, NbDialogRef } from '@nebular/theme';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EventEmitter } from 'events';
import { CellAvatarWithCheckBoxComponent } from './cell-avatar-with-check-box/cell-avatar-with-check-box.component';

@Component({
  selector: 'ngx-user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UserSelectComponent),
    multi: true
 }]
})
export class UserSelectComponent implements OnInit, ControlValueAccessor, OnChanges {
  @Input() users: User[];
  @Input('value') initValue: any;
  @Input() title:string;
  @Input() disabled:boolean;
  @Input('multi') isMulti:boolean;
  public selectedUsers:User[];
  searchWord:string;
  public unknown_picture = unknown_picture;
  isDisabled:boolean;
  users_src: LocalDataSource;
  settings = {
    actions:{
      add:false,
      edit:false,
      delete:false,
      position:'right'
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    hideSubHeader:true,
    hideHeader:true,
    pager:{
      perPage:4
    },
    columns: {
      picture:{
        type: 'custom',
        renderComponent: CellAvatarWithCheckBoxComponent,
      },
    },
  };

  onChange = (data: any) => {};
  onTouched = () => {};
  constructor(private dialogService:NbDialogService) { 
    this.title = 'Select User';
    this.isDisabled = false;
    this.isMulti = false;
    this.selectedUsers = [];
  }

  ngOnInit(): void {
    this.users_src = new LocalDataSource(this.users);    
    
    this.isDisabled = this.disabled;
    if(this.initValue){
      this.setSelectedUserData(this.initValue);      
    }    
  }

  ngOnChanges(changes:SimpleChanges){
    if('users' in changes){
      if(this.users){
        this.users_src = new LocalDataSource(this.users);
      }
    }
  }

  onUserClick(){

  }
  onRowSelect(event){
    if(this.isMulti)
    {
      let index = this.selectedUsers.findIndex((item:User)=>{
        return item.id == event.data.id;
      })
      if(index != -1){
        this.selectedUsers.splice(index,1);
      }else
        this.selectedUsers.push(event.data);
      this.onChange(this.selectedUsers);
    } 
    else
    {
      if(this.selectedUsers.length >0)
      {
        this.selectedUsers.forEach((item:any)=>{
          if(item.checked)
            item.checked = false; 
        })
        this.selectedUsers[0] = event.data;
      }
        
      else
        this.selectedUsers.push(event.data);
      this.onChange(this.selectedUsers[0]);
    }
      
    this.onTouched();
  }
  handleClose(dialogRef: NbDialogRef<any>){
    if(!this.isMulti)
      dialogRef.close()

  }
  onSearchWordChange(newWord:string){
    this.searchWord = newWord;
    if(this.searchWord){

      this.users_src.setFilter([{field:'first_name',search:this.searchWord}, {field:'last_name', search:this.searchWord}], false);    
    }else{
      this.users_src.setFilter(null);
    }    
  }

  open(dialog:TemplateRef<any>){
    if(!this.isDisabled){
      this.dialogService.open(dialog)    
      this.onTouched();
    }    
  }  
   
  setSelectedUserData(data:any){
    if(this.isMulti)
      this.selectedUsers = data;
    else
    {
      if(data)
        this.selectedUsers = [data];
    }
      
  }
  
  writeValue(data: any): void {
    this.setSelectedUserData(data);
  }
  registerOnChange(fn: (v: any) => void): void {
    this.onChange = fn;
      
  }
  
  registerOnTouched(fn: () => void): void {
     this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  } 
  getPicture(user:User){
    let url='';
    if(user.role == USERROLE.Parent)
      url = user.child.photo
    else
      url = user.picture
    return url;
  }
  getName(user:User){
    if(user.role == USERROLE.Parent)
      return user.child.first_name + ' ' + user.child.last_name;
    return user.first_name + ' ' + user.last_name;
  }
}
