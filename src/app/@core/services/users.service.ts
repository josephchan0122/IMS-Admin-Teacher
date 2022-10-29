import { Injectable } from '@angular/core';
import { User, USERROLE } from "../models/user";
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Observable, of, BehaviorSubject, forkJoin } from 'rxjs';
import { user as dummy_user, users as dummyUsers, user, users } from "../dummy";
import { map, tap } from 'rxjs/operators';
import { LocalDataSource } from 'ng2-smart-table';

export const unknown_picture="/assets/images/blank-profile.png";
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  api_url = environment.API_URL;  
  public current_user: User;
  public currentUserSubject:BehaviorSubject<User> = new BehaviorSubject<User>(undefined);
  public localSource:LocalDataSource;
  constructor(private httpClient:HttpClient) { 
  }
  setDummyCurrentUser(type){
    if(type == 'teacher')
      this.current_user = users[1];
    if(type =='admin')
      this.current_user = users[0];

  }

  
  AddUser(user:User):Observable<any>{
    return this.httpClient.post(`${this.api_url}/user/`,user);
  }
  getCurrentUser():Observable<User>{
    if (this.current_user){
      return of(this.current_user)
    } else{
      return this.httpClient.get(`${this.api_url}/user/current_user`).pipe(        
        map((user:User)=> {this.current_user = user; this.currentUserSubject.next(this.current_user); return user;})
      )
    }
  }
  setCurrentUserPassword(new_pwd:string, old_pwd:string):Observable<any>{
    return this.httpClient.post(`${this.api_url}/user/set_my_password/`, {current_pwd:old_pwd, new_pwd:new_pwd})
  }
  setUserPassword(userId:number, new_pwd:string):Observable<any>{
    return this.httpClient.post(`${this.api_url}/user/${userId}/set_password/`,{new_pwd:new_pwd});
  }
  getParents():Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.api_url}/user/?role=${USERROLE.Parent}`);
  }
  getTeachers():Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.api_url}/user/?role=Teacher`);
  }
  getAdmins():Observable<User[]> {
    let ret_user = dummyUsers.filter((user:User)=>{
      return user.role == USERROLE.Admin;
    });
    return of(ret_user);
  }
  getAllUsers():Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.api_url}/user/`);
  }
  updateUser(user:User, file):Observable<any>{
    const formData = new FormData();
    Object.keys(user).forEach((key)=>{
      formData.append(key, user[key]);
    })
    formData.set('picture', file);
    return this.httpClient.put(`${this.api_url}/user/${user.id}/`,formData).pipe(tap((data:User)=>{
      if(this.current_user.id == data.id)
        this.current_user = data;
        this.currentUserSubject.next(this.current_user);
    }));
  }
  patchUser(data):Observable<any>
  {    
    if('classNames' in data)
      data['classnames']=JSON.stringify(data['classNames']);
    return this.httpClient.patch(`${this.api_url}/user/${data.id}/`,data).pipe(tap((data:User)=>{
      if(this.current_user.id == data.id)
        this.current_user = data;
        this.currentUserSubject.next(this.current_user);
    }));
  }
  deleteUser(userId:number):Observable<any> {
    return this.httpClient.delete(`${this.api_url}/user/${userId}/`);
  }
  getUserById(id:number):Observable<User>{
    return this.httpClient.get<User>(`${this.api_url}/user/${id}/`);
  }
}
