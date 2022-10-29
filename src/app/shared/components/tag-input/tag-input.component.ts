import { ChangeDetectionStrategy, Component, ViewChild, OnInit, ElementRef, Input, forwardRef } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsersService } from "../../../@core/services/users.service";
import { User, USERROLE } from "../../../@core/models/user";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Child, NameOfClass } from '../../../@core/models/child';
import { ChildService } from '../../../@core/services/child.service';

export interface TagInputItem{
  id:number,
  user:User;
  child?:Child;
}
@Component({
  selector: 'ngx-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TagInputComponent),
    multi: true
 }],
})
export class TagInputComponent implements OnInit, ControlValueAccessor {
  @Input() multi:boolean;
  @Input() usertype:USERROLE;
  options: any[];
  filteredOptions$: Observable<TagInputItem[]>;
  selectedData:TagInputItem[];
  public data:TagInputItem[];
  
  //Custom Input
  private onChange: Function; 
  private onTouched: Function; 
  @ViewChild('autoInput') input:ElementRef;

  constructor(private userService:UsersService, private childSerivce:ChildService) {
    this.multi = true;
    this.usertype = USERROLE.Parent;
  }

  ngOnInit() {
    this.selectedData = [];
    this.options = [];

    if(this.usertype == USERROLE.Admin){
      forkJoin({
        teachers:this.userService.getTeachers(),
        children:this.childSerivce.getAllChildren()
      }).subscribe(({teachers,children}:{teachers:User[], children:Child[]})=>{
        let data:TagInputItem[]=[];
        teachers.forEach(item =>{
          data.push({id:data.length+1, user: item});
        })
        children.forEach((item:Child)=>{
          data.push({id:data.length+1,user:item.parent, child:item});
        })
        this.data = data;
        this.filteredOptions$ = of(data);
      })      
    }
    if(this.usertype == USERROLE.Teacher){  
      forkJoin({
        admins:this.userService.getAdmins(),
        children:this.childSerivce.getAllChildren()
      }).subscribe(({admins,children}:{admins:User[], children:Child[]})=>{
        let data:TagInputItem[]=[];
        admins.forEach(item =>{
          data.push({id:data.length+1,user: item});
        })
        children.forEach((item:Child)=>{
          data.push({id:data.length+1,user:item.parent, child:item});
        })
        this.data = data;
        this.filteredOptions$ = of(data);
      })
    }
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  getFilteredOptions(value: string): Observable<any[]> {
    let results=[];
    let serach_keyword = value.toLowerCase();
    results =  this.data.filter((item:TagInputItem)=>{
      if(item.user.role == USERROLE.Parent){
        if(item.child.first_name.toLowerCase().includes(serach_keyword)|| item.child.last_name.toLowerCase().includes(serach_keyword))
          return true;
      }
      else{
        if(item.user.first_name.toLowerCase().includes(serach_keyword)|| item.user.last_name.toLowerCase().includes(serach_keyword))
          return true;
      }
      return false;
    })
    return of(results);
  }

  onSearchKeyChange() {
    this.filteredOptions$ = this.getFilteredOptions(this.input.nativeElement.value);
  }

  onSelectionChange($event) {
    if(this.multi){
      let index = this.selectedData.findIndex((item:TagInputItem)=>{
        return item.id == $event.id
      })
      if(! (index >=0 ))
        this.selectedData.push($event);
      this.emitChanges(this.selectedData)
    }else{
      this.selectedData = [$event];
      this.emitChanges($event);
    }
    this.input.nativeElement.value = "";
    
  }
  emitChanges(value){
    if(this.onChange){
      this.onChange(value)
    }
    if(this.onTouched){
      this.onTouched();
    }
  }
  onRemove(user:User){
    let index =this.selectedData.findIndex((item:TagInputItem)=>{
      return item.id == user.id
    })
    this.selectedData.splice(index, 1);
    this.emitChanges(this.selectedData);
  }
  
  writeValue(obj: any): void {
    if(this.multi){
      this.selectedData=obj
    }else{
      if(obj){
        this.selectedData = [obj]
      }else{
        this.selectedData = [];
      }      
    }
  } 
  
  registerOnChange(fn: any): void{
    this.onChange = fn;
  } 
  
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  } 
  
  setDisabledState(isDisabled: boolean): void {
  }
  
  getItemName(item:TagInputItem){
    if(item.user.role == USERROLE.Parent)
      return item.child.first_name + " " + item.child.last_name;
    else
      return item.user.first_name + " " + item.user.last_name;
  }
  getItemTitle(item:TagInputItem){
    if(item.user.role == USERROLE.Parent)
      return "Child";
    if(item.user.role == USERROLE.Admin)
      return "Admin"
      
    if(item.user.role == USERROLE.Teacher)
      return "Teacher"
  }
  getItemPicture(item:TagInputItem){
    if(item.user.role == USERROLE.Parent)
      return item.child.photo;
    return item.user.picture;
  }
}
