import { User } from './user';
export enum NotificationVerb{
    MessageCreate = 'message_create',
    UnreadMessage = 'there_is_unreadmessage',
    NoMessage = 'no_message',
    Normal = 'Normal'
}
export interface ReceiverData{
    id:number;
    receiver:User;
    is_read:boolean;    
}
export interface NotificationData{
    id:number,
    verb:string;
    subject:string;
    content:string;
    is_child_broadcast:boolean;
    sender:User;
    created_at:Date;

}
export interface IMSNotification{
    id:number,
    data:NotificationData,
    receiver:number,
    is_read:boolean;
    created_at:Date;
    
}