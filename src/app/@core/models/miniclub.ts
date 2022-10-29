import { Child } from './child';

export interface MiniClub{
    id:number;
    title:string;    
    date:Date;
    price:number;
    limit:number;
    comment:string;
    children:Child[]
}