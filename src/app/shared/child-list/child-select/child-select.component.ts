import { Component, Input, OnInit, TemplateRef, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { Child } from '../../../@core/models/child';
import { unknown_picture } from '../../../@core/services/users.service';
import { ChildCellWithCheckboxComponent } from '../child-cell-with-checkbox/child-cell-with-checkbox.component';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'ngx-child-select',
  templateUrl: './child-select.component.html',
  styleUrls: ['./child-select.component.scss'],  
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ChildSelectComponent),
    multi: true
 }]
})
export class ChildSelectComponent implements OnInit, ControlValueAccessor, OnChanges {

  @Input() childs: Child[];
  @Input('value') initValue: any;
  @Input() title:string;
  @Input() disabled:boolean;
  @Input('multi') isMulti:boolean;
  public selectedChilds:Child[];
  searchWord:string;
  public unknown_picture = unknown_picture;
  isDisabled:boolean;
  childs_src: LocalDataSource;
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
        renderComponent: ChildCellWithCheckboxComponent,
      },
    },
  };
  ngOnChanges(changes:SimpleChanges){
    if('childs' in changes){
      if(this.childs){

        this.childs_src.load(this.childs);
      }
    }
  }
  onChange = (data: any) => {};
  onTouched = () => {};
  constructor(private dialogService:NbDialogService) { 
    this.title = 'Select Child';
    this.isDisabled = false;
    this.isMulti = false;
    this.selectedChilds = [];
    this.childs_src = new LocalDataSource(this.childs);
  }

  ngOnInit(): void {    
    
    this.isDisabled = this.disabled;
    if(this.initValue){
      this.setSelectedChildData(this.initValue);      
    }    
  }

  onUserClick(){

  }
  onRowSelect(event){
    if(this.isMulti)
    {
      
      let index = this.selectedChilds.findIndex((item:Child)=>{
        return item.id == event.data.id;
      })
      if(index != -1){
        event.data.checked = false;
        this.childs_src.update(event.data, event.data);
        this.selectedChilds.splice(index,1);
      }else
      {
        event.data.checked = true;
        this.childs_src.update(event.data, event.data);

        this.selectedChilds.push(event.data);
      }
      this.onChange(this.selectedChilds);
    } 
    else
    {
      if(this.selectedChilds.length >0)
      {
        this.selectedChilds.forEach((item:any)=>{
          if(item.checked)
            item.checked = false; 
        })
        this.selectedChilds[0] = event.data;
      }
        
      else
        this.selectedChilds.push(event.data);
      this.onChange(this.selectedChilds[0]);
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

      this.childs_src.setFilter([{field:'first_name',search:this.searchWord}, {field:'last_name', search:this.searchWord}], false);    
    }else{
      this.childs_src.setFilter(null);
    }    
  }

  open(dialog:TemplateRef<any>){
    if(!this.isDisabled){
      this.dialogService.open(dialog)    
      this.onTouched();
    }    
  }  
   
  setSelectedChildData(data:any){
    if(this.isMulti)
      this.selectedChilds = data;
    else
    {
      if(data)
        this.selectedChilds = [data];
    }
      
  }
  
  writeValue(data: any): void {
    this.setSelectedChildData(data);
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
}
