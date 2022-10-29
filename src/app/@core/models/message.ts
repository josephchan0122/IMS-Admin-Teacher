import { User, USERROLE } from "./user";
import { Child } from './child';
export enum MessageType{
    Normal = 'Noraml',
    BroadCast = 'BroadCast'
}
export interface Message{
    id:number,
    subject:string,
    child?:Child,    // shows child photo if the message is between parent and teacher(Admin)
    sender:User,
    receiver:User,
    content:string,
    is_read:boolean,
    attachedFiles:any[]
    msgType:MessageType,
    headerMessage:number,    // -1:HeaderMessage, other: Sequent Message of HeaderMessage
    created_at:string
}