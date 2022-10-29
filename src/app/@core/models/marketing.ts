import { User } from './user';

export interface Marketing{
    id:number;
    question:string;
    content:string;
    poster:User
    created_at:Date;
}