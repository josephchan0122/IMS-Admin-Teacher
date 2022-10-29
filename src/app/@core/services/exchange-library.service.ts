import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Observable, of, BehaviorSubject, from } from 'rxjs';
import { ExchangeLibrary } from '../models/exchangelibrary';
import {books} from '../dummy';
@Injectable({
  providedIn: 'root'
})
export class ExchangeLibraryService {
  api_url = environment.API_URL;
  
  constructor(private httpClient:HttpClient) { 
  }

  getAllBooks():Observable<ExchangeLibrary[]>{
    return this.httpClient.get<ExchangeLibrary[]>(`${this.api_url}/exchangelibraries/`);
  }

  addBook(book:ExchangeLibrary):Observable<any>{
    let data:any = book;
    const formData = new FormData();
    Object.keys(book).forEach((key)=>{
      formData.append(key, book[key]);
    })    
    if(data.pictureFile) formData.set('picture', data.pictureFile);
    return this.httpClient.post(`${this.api_url}/exchangelibraries/`, formData);    
  }
  deleteBook(book:ExchangeLibrary):Observable<any>{
    return this.httpClient.delete(`${this.api_url}/exchangelibraries/${book.id}/`);    
  }
  
}
