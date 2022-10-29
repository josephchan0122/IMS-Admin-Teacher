import { Injectable } from '@angular/core';
import { User } from "../models/user";
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Observable, of, BehaviorSubject } from 'rxjs';
import { pictures, children } from "../dummy";
import { ChildPicture } from '../models/picture';
import { user as dummy_user, users as dummyUsers, user, users } from "../dummy";
import { Child } from '../models/child';
@Injectable({
  providedIn: 'root'
})
export class PictureService {
  api_url = environment.API_URL;
  constructor(private httpClient:HttpClient) { 
  }

  getPicturesOfChild(childId:number):Observable<ChildPicture>{
    return this.httpClient.get<ChildPicture>(`${this.api_url}/child/${childId}/pictures/`);
    // let data:ChildPicture={
    //   child:undefined,
    //   pictures:[]
    // };
    
    // data.child = children.find((child:Child) =>{
    //   return child.id == childId;
    // })
    // data.pictures = pictures;
    // return of(data);
  }
}
