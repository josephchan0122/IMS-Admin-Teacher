import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Appointment, PresetAppointment, PresetItem, PresetRecord, TimeRangeItem } from '../../../@core/models/appointment';
import * as moment from 'moment';
import { Child, NameOfClass } from '../../../@core/models/child';
import { AppointmentService } from '../../../@core/services/appointment.service';
import { ChildService } from '../../../@core/services/child.service';
interface SlotInfo{
  child:Child;
  start: Date;
  end: Date;
  booked: boolean;
}

@Component({
  selector: 'ngx-preset',
  templateUrl: './preset.component.html',
  styleUrls: ['./preset.component.scss']
})
export class PresetComponent implements OnInit {

  classroom:NameOfClass;
  apnts:PresetAppointment[];
  presetRecord:PresetRecord;
  presetItem:PresetItem
  slots:any;
  constructor(private childService:ChildService,
    private appointmentService:AppointmentService
    ) {

   }

  ngOnInit(): void {
    this.classroom =  this.childService.getCurrentClassName();
    forkJoin({
      record:this.appointmentService.GetCurrentPresetRecord(),
      data:this.appointmentService.GetPresetAppointmentByClassroom(this.classroom)
    }).subscribe(ret=>{
      this.presetRecord = ret.record;
      this.apnts = ret.data;
      this.presetRecord.presetItems.forEach((item)=>{
        if(item.classroom == this.classroom)
          this.presetItem = item;
      });
      this.slots = this._generateslotsInfo(this.apnts, this.classroom);
    })
  }
  _generateslotsInfo(appnts:PresetAppointment[], classroom:NameOfClass){
    let retSlotData={}
    let presetItem = this.presetItem;
    let duration = presetItem.duration;
    if(!presetItem) return {};
    presetItem.timeranges.forEach((item:TimeRangeItem)=>{
      retSlotData[item.id] = [];
      let startTime = moment(item.startTime);
      let endTime = moment(item.endTime);
      for(let j = startTime.clone(); j.isBefore(endTime,'minutes');j.add(duration,'minutes')){
        //Check if J time slot is booked or not.
        let findedItem = appnts.find((item:PresetAppointment)=>{
          let start = moment(item.start);
          let end = moment(item.end)
          return (j.isSame(start,'minutes') && j.clone().add(duration,'minutes').isSame(end))
        })
        let data:SlotInfo={
          child:undefined,          
          start: j.toDate(),
          end: j.clone().add(duration,'minutes').toDate(),
          booked: false,
        }        
        if(findedItem){
          data.child = findedItem.child;
          retSlotData[item.id].booked = true;
        }
        retSlotData[item.id].push(data);
      }
    })
    console.log(retSlotData)
    return retSlotData;
    
  }
}
