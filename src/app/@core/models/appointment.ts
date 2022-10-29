import { User } from "./user";
import { Child, NameOfClass } from './child';
export enum COLOR {
    Red = 'red',
    Blue = 'blue',
    Yellow = 'yellow',
    Preset = 'preset'
};
export enum AppointmentType{
    PRESET = 'preset',
    FREE = 'free'
}
export enum PresetType{
  Toddler= 'toddler',
  Kindergarten = 'kindergarten'
}

export const colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3',
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    },
    preset: {
      primary: '#09ec89',
      secondary: '#bae6ca',
    }
};

export enum AppointmentStatus{
  DECLINE="decline",
  CONFIRM="confirm",
  PENDING="pending",
};

export interface Appointment{ // this is only for free meeting beween parent and teacher
    id:number,
    teacher:User,
    parent:User,
    child:Child,
    start: Date;
    end: Date;
    title: string;
    color: COLOR;
    type:AppointmentType,
    presetType?: PresetType,
    comment?: string,
    status:AppointmentStatus
}

export interface TimeRangeItem{
  id:number;
  startTime:Date;
  endTime:Date;
  date:Date;  
}
export interface PresetItem{
  id:number;
  classroom:NameOfClass;
  timeranges:TimeRangeItem[];
  duration:number;
}
export enum PresetStatus{
  Closed='closed',
  Started='started',
  BeforeStart='before start'
}
export interface PresetRecord{
  id:number;
  closeDateTime:Date;
  presetItems:PresetItem[]
  status:PresetStatus
}
export interface PresetAppointment{ // This is only for meeting for Preset.
  id?:number;
  className:NameOfClass;
  presetInfo:number;
  timerange:TimeRangeItem;         // Timerange of PresetItem to represent where appointment is included
  child:Child;
  start: Date;
  end: Date;
}

