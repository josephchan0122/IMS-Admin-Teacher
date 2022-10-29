import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Observable, of, BehaviorSubject } from 'rxjs';
import { events, appointmentsOfOneUser,presetInfos, presetApnts } from "../dummy";
import { Appointment, colors, COLOR, AppointmentType, PresetRecord, AppointmentStatus, PresetStatus, PresetAppointment } from "../models/appointment";
import { NameOfClass } from '../models/child';
@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  api_url = environment.API_URL;

  constructor(private httpClient:HttpClient) { }
  createBlankAppointment():Appointment{
    return {
      id:-1,
      title:'',
      color:COLOR.Red,
      parent:undefined,
      teacher:undefined,
      start:undefined,
      end:undefined,
      status:AppointmentStatus.PENDING,
      child:undefined,
      type:AppointmentType.FREE

    }
  }
  createBlankPresetAppointment():PresetAppointment{
    return {
      className:undefined,
      presetInfo:undefined,
      child:undefined,
      start:undefined,
      timerange:undefined,
      end:undefined      
    }
  }
  getEventsByUserId(userId):Observable<Appointment[]>{
    return this.httpClient.get<Appointment[]>(`${this.api_url}/appointments/user/${userId}/`);
  }
  getEventsOfCurrentUser():Observable<Appointment[]>{
    return this.httpClient.get<Appointment[]>(`${this.api_url}/appointments/`);
    // return of(appointmentsOfOneUser);
  }
  patchEvent(apnt:Appointment, patch):Observable<any>{
    return this.httpClient.patch(`${this.api_url}/appointments/${apnt.id}/`,patch)
  }
  getEventById(eventId):Observable<Appointment>{
    return this.httpClient.get<Appointment>(`${this.api_url}/appointments/${eventId}/`);
  }
  deleteEventById(eventId):Observable<any>{
    appointmentsOfOneUser.splice(eventId,1);
    return of("success");
  }
  
  
  StartNewPreset(presetRecord:PresetRecord):Observable<any>{    
    presetRecord.status = PresetStatus.Started;
    return this.httpClient.post(`${this.api_url}/appointments/preset_record/`,presetRecord);   
  }
  UpdatePresetRecord(presetRecord:PresetRecord):Observable<any>{
    return this.httpClient.patch(`${this.api_url}/appointments/preset_record/${presetRecord.id}/`,presetRecord);   
    // presetInfos[presetRecord.id] = presetRecord;
    return of('success')
  }

  GetCurrentPresetRecord():Observable<PresetRecord>{    
    return this.httpClient.get<PresetRecord>(`${this.api_url}/appointments/preset_record/current/`);
  }

  GetPresetAppointmentByClassroom(classroom:NameOfClass):Observable<PresetAppointment[]>{
    // Return PresetAppointments of classroom of current PresetRecord
    return this.httpClient.get<PresetAppointment[]>(`${this.api_url}/appointments/preset_appointments?current_preset=true&className=${classroom}`);
  }
 
  CloseCurrentPreset(presetId:number):Observable<any>{
    return this.httpClient.patch(`${this.api_url}/appointments/preset_record/${presetId}/`,{status:PresetStatus.Closed});
  }
  updatePresetAppointment(apnt:PresetAppointment):Observable<any>{
    let data:any=Object.assign({},apnt);
    data.child = apnt.child.id;
    data.timerange = apnt.timerange.id;    
    return this.httpClient.patch(`${this.api_url}/appointments/preset_appointments/${apnt.id}/`,data);
  }
  UpdateEventById(appointment:Appointment):Observable<any>{
    let data ={
      title:appointment.title,
      start:appointment.start,
      end:appointment.end
    }
    return this.httpClient.patch(`${this.api_url}/appointments/${appointment.id}/`, data);
  }

  createPresetAppointment(apnt:PresetAppointment):Observable<any>{
    let data:any=Object.assign({},apnt);
    data.child = apnt.child.id;
    data.timerange = apnt.timerange.id;    
    return this.httpClient.post(`${this.api_url}/appointments/preset_appointments/`,data);
  }

  CreateEvent(appointment:Appointment):Observable<any>{    
    if(appointment.type == AppointmentType.PRESET)
      appointment.color = COLOR.Preset;
    else
    {
      let colorList=[];
      for (let col in COLOR){
        console.log(col)
        if(COLOR[col]!=COLOR.Preset)
          colorList.push(COLOR[col]);
      }
      appointment.color =  colorList[Math.floor(Math.random() * colorList.length)];
    }
    let data:any;
    data = appointment;
    data.child = appointment.child.id;
    data.parent = appointment.parent.id;
    data.teacher = appointment.teacher.id;
    return this.httpClient.post(`${this.api_url}/appointments/`, appointment);
  }
}
