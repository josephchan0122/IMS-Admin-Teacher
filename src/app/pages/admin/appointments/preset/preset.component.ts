import { Component, OnInit } from '@angular/core';
import { YesNoDialogComponent } from '../../../../components/yes-no-dialog/yes-no-dialog.component';
import { NbDialogService } from '@nebular/theme';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isInvalidControl } from "../../../../@core/utils/form.util";
import {  MustAfter } from "../../../../@core/utils/validators.util";
import { PresetItem, PresetRecord, PresetStatus, TimeRangeItem } from "../../../../@core/models/appointment";
import { AppointmentService } from "../../../../@core/services/appointment.service";
import * as moment from "moment";
import { NameOfClass } from '../../../../@core/models/child';
import { ChildService } from '../../../../@core/services/child.service';
import { ToastService } from '../../../../@core/services/toast.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { DateTimeAdapter } from '@danielmoncada/angular-datetime-picker';
import { presetItems } from '../../../../@core/dummy';
@Component({
  selector: 'ngx-preset',
  templateUrl: './preset.component.html',
  styleUrls: ['./preset.component.scss']
})
export class PresetComponent implements OnInit {
  isStarted:boolean;
  isFinished:boolean;
  isNewStarted:boolean;
  actionText:string;
  presetRecordForm:FormGroup;
  currentPresetRecord:PresetRecord

  constructor(
    private dialogService: NbDialogService,
    private childService:ChildService,
    private toastService:ToastService,
    private appointmentService: AppointmentService,
    private translateService: TranslateService,
    private dateAdapter:DateTimeAdapter<any>,
    private fb: FormBuilder ) {
    this.isStarted = false;
    this.isFinished = false;
    this.isNewStarted = false;
    this.actionText = "START";
   }
  
  ngOnInit(): void {
    this.presetRecordForm = this.fb.group({
      id:[undefined],
      closeDateTime:['', Validators.required],
      presetItems:this.fb.array(this.childService.classNameList.map(classname=>this._buildPresetItemForm(classname)))
    })
    console.log(this.presetRecordForm);
    this.dateAdapter.setLocale(this.translateService.currentLang);
    this.translateService.onLangChange.subscribe((event:LangChangeEvent)=>{
      this.dateAdapter.setLocale(event.lang)
    })
    this.appointmentService.GetCurrentPresetRecord().subscribe((res:PresetRecord) => {
      this.isFinished = true;
      this.isStarted = false;
      console.log(res)
      if(res){
        this.currentPresetRecord = res;
        this.presetRecordForm = this._buildPresetFormFromData(res)
        if(res.status == PresetStatus.Started)
        {
          this.isStarted = true;
          this.isFinished = false;
        }
          
        if(res.status == PresetStatus.Closed)
        {
          this.isStarted = false;
          this.isFinished = true;
        }
          
      }
      
      
      this._setActionText();
    })
    console.log(this.presetRecordForm);
  }
  onToogleChange($event:boolean){    
    this.isStarted = $event;
    if($event == true){
      this.onSubmit();
      if(this.presetRecordForm.invalid){        
        setTimeout(_=>{this.isStarted = false; this._setActionText()}, 100);
      }
    }
    if($event==false){
      this.dialogService.open(YesNoDialogComponent,{context:{
        title:'Are you going to close?'
      }}).onClose.subscribe(ret=>{
        if(ret==false){         
          this.isStarted = true;
          this.actionText = "CLOSE";
        }else{
          this.appointmentService.CloseCurrentPreset(this.currentPresetRecord.id).subscribe(_=>{
            this.isFinished = true;  
          })          
        }
      })
    }
    this._setActionText();
  }
  _buildPresetFormFromData(record:PresetRecord){
    let formGroup:FormGroup = this.fb.group({
      id:[record.id],
      closeDateTime:[record.closeDateTime, Validators.required],
      presetItems:this.fb.array(record.presetItems.map(presetItem=>this._buildPresetItemForm(presetItem.classroom, presetItem)))
    })
    return formGroup;
  }
  _buildPresetItemForm(classroom:NameOfClass, data?:PresetItem):FormGroup{
    let formGroup:FormGroup
    if(data)
    {
      formGroup = this.fb.group({
        id:data.id,
        classroom:[classroom],
        timeranges:this.fb.array(data.timeranges.map(item=>this._buildTimeRangeForm(item)),Validators.minLength(3)),
        duration:[data.duration,Validators.required]
      })      
    }else{
      formGroup =  this.fb.group({
        id:undefined,
        classroom:[classroom],
        timeranges:this.fb.array([1,1,1].map(item=>this._buildTimeRangeForm()),Validators.minLength(3)),
        duration:[20,Validators.required]
      })
    }
      

    return formGroup;
  }
  _buildTimeRangeForm(data?:TimeRangeItem){
    let formGroup:FormGroup =  this.fb.group({
      id:undefined,
      startTime:[moment().startOf('hours').toDate(), Validators.required],
      endTime:[moment().startOf('hours').add(4,'hours').toDate(), Validators.required],
      date:[moment().startOf('days').toDate(),Validators.required]
    }, {validators:[MustAfter('startTime','endTime','date')]})
    if(data)
      formGroup.reset(data);
    return formGroup
  }
  get presetItemForms():FormArray{
    return this.presetRecordForm.get('presetItems') as FormArray;
  }
  _setActionText(){
    if(this.isStarted == true)
      this.actionText = "CLOSE";
    else
      this.actionText = "START";
  }
  updateSubmit(){
    this.onSubmit();
  }
  onSubmit(){
    this.presetRecordForm.markAllAsTouched();
    console.log(this.presetRecordForm);
    if(this.presetRecordForm.valid){
      // let presetInfo:PresetRecord = Object.assign({}, this.presetRecordForm.value);      
      
      let formValue = this.presetRecordForm.value;
      formValue['presetItems'].forEach((item:PresetItem) => {
        item.timeranges.forEach(timerange=>{
          timerange.startTime = moment(timerange.date).hour(moment(timerange.startTime).hour()).minute(moment(timerange.startTime).minute()).toDate();
          timerange.endTime = moment(timerange.date).hour(moment(timerange.endTime).hour()).minute(moment(timerange.endTime).minute()).toDate();
        })        
      });
      let presetInfo = Object.assign(this.currentPresetRecord,formValue);
      if(this.isNewStarted){
        this.appointmentService.StartNewPreset(presetInfo).subscribe(_=>{
            this.toastService.success('New PresetAppointment has been started', 'success')
          },
          error=>{
            this.isStarted = false
          }
        );
      } else if(this.isStarted){        
        console.log(presetInfo);
        this.appointmentService.UpdatePresetRecord(presetInfo).subscribe(_=>{
          this.toastService.success('Current PresetAppointment has been updated', 'success')
        });
      }

    }
  }
  addTimeRangeForm(presetItemForm:FormGroup){
    (presetItemForm.get('timeranges') as FormArray) .push(this._buildTimeRangeForm());
  }
  removeTimeRangeForm(presetItemForm, index){
    this.dialogService.open(YesNoDialogComponent,{context:{
      title:'Are you sure?'
    }}).onClose.subscribe(ret=>{
      if(ret==true){         
        (presetItemForm.get('timeranges') as FormArray).removeAt(index);
      }
    })    
  }
  startNew(){
    this.isNewStarted = true;
    this.isFinished = false;
    this.isStarted = false;
  }
  isInvalidControl = isInvalidControl;
}
