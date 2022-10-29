
import { Child } from './child';

export enum BookStatus {
    PRESENT='present',
    RENTED = 'rented'
}
export interface ExchangeLibrary{
    id:number;
    title:string;
    picture: string;
    child?:Child,
    comment?:string,
    donator?:string,
    status:BookStatus;
}