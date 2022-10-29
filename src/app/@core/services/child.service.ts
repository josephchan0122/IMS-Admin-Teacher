import { Injectable } from '@angular/core';
import { Child, NameOfClass, ChildDailyInformation, SiblingChild } from "../models/child";
import { environment } from "../../../environments/environment";
import { Observable, of, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { children, childDailyInformations } from "../dummy";
import { find, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ChildService {
  api_url = environment.API_URL;
  private current_class_name: NameOfClass;
  public currentClassNameSubject:BehaviorSubject<NameOfClass>;
  constructor(private httpClient:HttpClient) {
    this.currentClassNameSubject = new BehaviorSubject<NameOfClass>(undefined);
   }
  get classNameList():any[]{
    return Object.keys(NameOfClass).map( item => NameOfClass[item]);
  }

  addNewChild(submitdata):Observable<any>{
    return this.httpClient.post(`${this.api_url}/child/`,submitdata);

  }
  deleteChild(childId:number):Observable<any>{
    return this.httpClient.delete(`${this.api_url}/child/${childId}/`);
  }
  isChildToddler(child:Child):boolean{
    if (child.nameOfClass == NameOfClass.Bamboo || child.nameOfClass == NameOfClass.Iroko)
      return true;
    return false;
  }
  getChildrenByClassName(className:NameOfClass):Observable<Child[]>{
    return this.httpClient.get<Child[]>(`${this.api_url}/child?nameOfClass=${className}`);
  }
  getAllChildren():Observable<Child[]>{ // Return All Children without considering current Classroom of loggedin user
    return this.httpClient.get<Child[]>(`${this.api_url}/child/`);
  }
  getChildsOfTeacher(teacher:User):Observable<any>{
    return this.httpClient.get<Child[]>(`${this.api_url}/child/`);
    // return of(children);
  }
  getChildById(childId:number):Observable<Child>{    
    return this.httpClient.get<Child>(`${this.api_url}/child/${childId}/`);
    // return of(children[childId-1]);
  }
  createChildDailyInformation(childDailyInformation:ChildDailyInformation):Observable<any>{
    let data:any = childDailyInformation;
    if(childDailyInformation.menu)
      data.menu = childDailyInformation.menu.id;
    if(childDailyInformation.child)
      data.child = childDailyInformation.child.id;
    return this.httpClient.post(`${this.api_url}/dailyinformations/`, data);
  }
  updateChildDailyInformation(childDailyInformation:ChildDailyInformation):Observable<any>{
    let data:any = childDailyInformation;
    if(childDailyInformation.menu)
      data.menu = childDailyInformation.menu.id;
    if(childDailyInformation.child)
      data.child = childDailyInformation.child.id;
    return this.httpClient.put(`${this.api_url}/dailyinformations/${childDailyInformation.id}/`, data);
  }
  getLatestChildDailyInformation(childId:number):Observable<ChildDailyInformation>{
    return this.httpClient.get<ChildDailyInformation>(`${this.api_url}/child/${childId}/latest_dailyinfo/`)
  }

  getCurrentClassName(){
    if(this.current_class_name == undefined)
      this.current_class_name = localStorage.getItem('class_name') as NameOfClass;
    return this.current_class_name
  }

  setCurrentClassName(name: NameOfClass){
    this.current_class_name = name;
    localStorage.setItem('class_name', this.current_class_name);
    this.currentClassNameSubject.next(this.current_class_name);
  }

  AddSiblings(pchild:Child, siblings:Child[]):Observable<any>{

    let children = siblings.map(item=>{return item.id});
    return this.httpClient.post(`${this.api_url}/child/sibling/${pchild.sibling_group}/add/`,{children:children})
  }
  RemoveChildFromSibling(child:Child):Observable<any>{  // Have to change sibling Id to the blank sibling id.
    return this.httpClient.post(`${this.api_url}/child/${child.id}/remove_from_sibling/`,{});
  }
}
