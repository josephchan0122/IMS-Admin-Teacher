import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { MiniClub } from '../../../../@core/models/miniclub';
import { isInvalidControl } from "../../../../@core/utils/form.util";
import { DateTimeAdapter } from "@danielmoncada/angular-datetime-picker";
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'ngx-club-form',
  templateUrl: './club-form.component.html',
  styleUrls: ['./club-form.component.scss']
})
export class ClubFormComponent implements OnInit {
  @Input() initdata:MiniClub;
  @Output('onSubmit') submitEvent =  new EventEmitter<any>();
  clubForm:FormGroup;
  club:MiniClub;
  constructor(
    private fb:FormBuilder,
    private dateAdapter:DateTimeAdapter<any>,
    private translateService:TranslateService
  ) { }

  ngOnInit(): void {
    this.clubForm = this.fb.group({
      title:['', Validators.required],
      date:[moment().toDate(), Validators.required],
      price:[4.99, [Validators.required,Validators.min(1)]],
      limit:[10, [Validators.required, Validators.min(1)]],
      comment:['', Validators.nullValidator]
    })
    this.dateAdapter.setLocale(this.translateService.currentLang)
    this.translateService.onLangChange.subscribe((lang:LangChangeEvent)=>{this.dateAdapter.setLocale(lang.lang)});
    if(!this.initdata)
    {
      this.initdata = {
        id:undefined,
        title:undefined,
        comment:undefined,
        date:undefined,
        price:undefined,
        limit:undefined,
        children:[]
      }
    }else{
      this.clubForm.reset(this.initdata)
    }
  }
  onFormSubmit(){
    this.clubForm.markAllAsTouched();
    if(this.clubForm.valid){
      this.club = Object.assign(this.initdata, this.clubForm.value);
      this.submitEvent.emit(this.club);
    }
  }
  isInvalidControl = isInvalidControl
}
