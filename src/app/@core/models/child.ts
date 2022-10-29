import { MenuItem } from './meal-menu';
import { User } from './user';

export enum NameOfClass{
    Baobab = 'Baobab',
    Iroko = 'Iroko',
    Bamboo = 'Bamboo',
    Acajou = 'Acajou'
}

export interface EmergencyContact {
    name:string,
    email:string,
    phone_number:string   
}
export interface AuthPersonContact {
    first_name:string,
    last_name:string,
    photo:string,
    phone_number:string
}
export interface SiblingChild{
    id:number;
    first_name:string;
    last_name:string;
    parent:number,
    photo?:string;
}
export interface Child{
    id:number;
    photo?:string;
    parent:User;
    siblings:SiblingChild[];
    first_name:string;
    last_name:string;
    birth:string;
    gender:string;
    nationality:string;
    address:string;
    nameOfClass:NameOfClass;    
    firstNameOfMother?:string,
    lastNameOfMother?:string,
    phoneOfMother?:string,
    emailOfMother?:string,
    firstNameOfFather?:string,
    lastNameOfFather?:string,
    phoneOfFather?:string,
    emailOfFather?:string,
    emergenyContacts?:EmergencyContact[],
    authPersons?:AuthPersonContact[],
    allgeries?:string,
    food_restriction?:string,
    health_issue?:string,
    sibling_group?:number
    
}
export interface InjureRecord{
    id:number,
    place:string,
    taken_time:Date,
    comment:string
};

export interface ChildDailyInformation{
    id:number;
    child: Child,
    ate:number,
    ate_comment:string,
    menu: MenuItem,
    comment: string,
    nap_start_time: Date,
    nap_end_time:Date,
    is_bowel_move:boolean,
    bowel_movement_time:number,
    injures: InjureRecord[],
    updated_at?: Date,
};