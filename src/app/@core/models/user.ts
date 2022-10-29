import { NameOfClass, Child } from './child';

export enum USERROLE {
    Admin = 'Admin',
    Teacher = 'Teacher',
    Parent = 'Parent'
  }
export interface User{
    id:number,
    username:string,
    first_name:string,
    last_name:string,
    email:string,
    role:USERROLE,
    classNames?:NameOfClass[],
    picture:string,
    child?:any;
    phoneNumber?:string,
    address?:string
    
}