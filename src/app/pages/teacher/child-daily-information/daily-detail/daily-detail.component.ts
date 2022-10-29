import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChildService } from '../../../../@core/services/child.service';
import { switchMap } from 'rxjs/operators';
import { Child, ChildDailyInformation, InjureRecord } from '../../../../@core/models/child';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { isInvalidControl } from '../../../../@core/utils/form.util';
import { WeekNameList,DayNameListForMenu } from "../../../../@core/constants";
import * as moment from "moment";
import {  } from "module";
import { MustAfter } from '../../../../@core/utils/validators.util';
import { MenuItem } from '../../../../@core/models/meal-menu';
import { NbDialogService, NbMenuService, NbToastrService } from '@nebular/theme';
import { MealMenuService } from '../../../../@core/services/meal-menu.service';
import { forkJoin } from 'rxjs';
import { DateTimeAdapter } from "@danielmoncada/angular-datetime-picker";
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ToastService } from '../../../../@core/services/toast.service';
import { YesNoDialogComponent } from '../../../../components/yes-no-dialog/yes-no-dialog.component';
@Component({
  selector: 'ngx-daily-detail',
  templateUrl: './daily-detail.component.html',
  styleUrls: ['./daily-detail.component.scss']
})
export class DailyDetailComponent implements OnInit {

  childId:number;
  child:Child;
  childDailyInformation:ChildDailyInformation;
  formGroup:FormGroup;
  selectedMenu:MenuItem;
  allmenus:MenuItem[];
  weekNameList;
  dayNameList;
  constructor(
    private router:Router,
    private mealMenuService:MealMenuService,
    private childService:ChildService,
    private route:ActivatedRoute, 
    private toastrService:ToastService,
    private translateService:TranslateService,
    private dateAdapter:DateTimeAdapter<any>,
    private fb:FormBuilder,
    private dialogService:NbDialogService,
    
    ) { 
      this.weekNameList = WeekNameList;
      this.dayNameList = DayNameListForMenu
      this.formGroup = this._buildBlankForm();
    }

  ngOnInit(): void {
    this.dateAdapter.setLocale(this.translateService.currentLang);
    this.translateService.onLangChange.subscribe((langEvent:LangChangeEvent)=>{this.dateAdapter.setLocale(langEvent.lang)});
    this.route.paramMap.pipe(switchMap(
      params => {
        this.childId = Number(params.get('childId'));
        return forkJoin(
          {
            data:this.childService.getLatestChildDailyInformation(this.childId),
            allmenu: this.mealMenuService.getAllMenuInformation()
          }
        )
      }
    )).subscribe(({data,allmenu}:{data:any, allmenu:MenuItem[]}) => {
      this.child = data.child
      this.allmenus = allmenu;
      this.findSelectedMenu();
      if(data.dailyInfo.id){
        this.childDailyInformation = data.dailyInfo;  
        this.InitForm(data.dailyInfo);
      }
    })
  }
  _buildBlankForm(){
    let formGroup:FormGroup = this.fb.group({
      ate:[0,Validators.nullValidator],
      ate_comment:['', Validators.nullValidator],
      week: [this.weekNameList[0].key, Validators.nullValidator],
      day: [this.dayNameList[0], Validators.nullValidator],
      comment:['', Validators.nullValidator],
      nap_start_time:[moment().toDate(),Validators.nullValidator],
      nap_end_time :[moment().toDate(), Validators.nullValidator],
      is_bowel_move:[false, Validators.nullValidator],
      bowel_movement_time:[1, Validators.nullValidator],
      injureForms:this.fb.array([1].map(x=>this.buildInjureForm(x))),
      injureComment:['', Validators.nullValidator],
    },{validators:[MustAfter('nap_start_time','nap_end_time')]})
    return formGroup
  }
  InitForm(data:ChildDailyInformation){
    console.log(data);
    if(data){
      this.formGroup.reset(data);
      if(data.menu){
        this.formGroup.get('week').setValue(data.menu.weekName);
        this.formGroup.get('day').setValue(data.menu.dayName);
        this.selectedMenu = data.menu;
      }
      
      if(data.injures.length >0){
        // this.formGroup.get('injureForms').setValue(data.injures.map((x:InjureRecord)=>{return this.buildInjureForm(x)}))    
        let formArray:FormArray = this.formGroup.get('injureForms') as FormArray;
        formArray.clear();
        data.injures.forEach(injure=>{
          formArray.push(this.buildInjureForm(injure))
        })
        
        this.formGroup.get('injureComment').setValue(data.injures[0].comment);
      }  
    }
    
  }
  buildInjureForm(data?){
    let injureForm = this.fb.group({
      id:['',Validators.nullValidator],
      place:['', Validators.required],
      taken_time:['',Validators.required],
      comment:['', Validators.nullValidator]
    })
    if(data)
      injureForm.reset(data);
    return injureForm
  }

  IsBowelChange(data){

  }

  get isToddler():boolean{
    if(!this.child) return false;
    return this.childService.isChildToddler(this.child);
  }


  get IsBowelled():string{
    if(this.formGroup.get('is_bowel_move').value)
      return "Yes";
    return "No";
  }
  get IsBowelledBoolean():boolean{
    return !this.formGroup.get('is_bowel_move').value;
  }

  get injureForms():FormArray{
    return this.formGroup.get('injureForms') as FormArray;
  }

  addInjureForm(){
    this.injureForms.push(this.buildInjureForm())
  }
  removeInjureForm(index){
    this.dialogService.open(YesNoDialogComponent,{context:{
      title:'Are you sure?'
    }}).onClose.subscribe(ret=>{
      if(ret==true)
        this.injureForms.removeAt(index);
    })
    
  }

  onMenuChange(data){    
    this.findSelectedMenu();
  }
  findSelectedMenu(){
    this.selectedMenu =  this.allmenus.find((x:MenuItem)=>{
      return x.dayName == this.formGroup.get('day').value && x.weekName == this.formGroup.get('week').value
    })
  }
  back(){
    this.router.navigate(['/teacher/childdailyinformation']);
  }
  onSubmit(){
    this.formGroup.markAllAsTouched();
    if(this.formGroup.valid){
      if(this.childDailyInformation){
        let latest_date= moment(this.childDailyInformation.updated_at)
        let today = moment();
        
        this.childDailyInformation = Object.assign(this.childDailyInformation, this.formGroup.value);
        this.childDailyInformation.menu = this.selectedMenu;
        this.childDailyInformation.child = this.child;
        this.childDailyInformation.injures = this.formGroup.get('injureForms').value;
        this.childDailyInformation.injures.forEach(injure=>{
          injure.comment = this.formGroup.get('injureComment').value;
        })
        if(today.isAfter(latest_date,'days') || !this.childDailyInformation.id){
          this.childService.createChildDailyInformation(this.childDailyInformation).subscribe(data => {
            this.childDailyInformation = data;
            this.toastrService.success("Submitted First Today's Daily Information",'success')
          })
        }else{
          this.childService.updateChildDailyInformation(this.childDailyInformation).subscribe(data =>{
            this.childDailyInformation = data;
            this.toastrService.success("Updated Today's Daily Information",'success')
          });
        }
        
      }else{
        this.childDailyInformation = Object.assign({}, this.formGroup.value);
        this.childDailyInformation.child = this.child;
        this.childDailyInformation.menu = this.selectedMenu;
        this.childDailyInformation.injures = this.formGroup.get('injureForms').value;
        this.childDailyInformation.injures.forEach(injure=>{
          injure.comment = this.formGroup.get('injureComment').value;
        })
        this.childService.createChildDailyInformation(this.childDailyInformation).subscribe(data => {
          this.childDailyInformation = data;
          this.toastrService.success("Submitted First Today's Daily Information",'success')
        })
      }
    }
  }
  _submitSuccess(){
    this.toastrService.success("Updated Child Daily Information", "success");
  }
  isInvalidControl = isInvalidControl
  get buttonText(){
    if(!this.childDailyInformation) return 'Submit';
    if(!this.childDailyInformation.id) return 'Submit';
    let latest_date= moment(this.childDailyInformation.updated_at)
    let today = moment();
    if(today.isAfter(latest_date,'days')) return 'Submit';
    return 'Update'
        
  }
}
