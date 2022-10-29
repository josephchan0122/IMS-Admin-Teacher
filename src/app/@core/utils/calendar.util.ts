import { CalendarEvent, CalendarEventAction} from "angular-calendar";
import { Appointment, colors } from "../models/appointment";

export function calendarEventFromAppointment(item:Appointment, actions?:CalendarEventAction[]):CalendarEvent{
    let ret_item:CalendarEvent={
      id:item.id,
      start:new Date(item.start),
      end:new Date(item.end),
      title:item.title,
      color:colors[item.color],            
      actions:actions,
      meta: item.type
    }
    console.log(ret_item);
    return ret_item;
  }