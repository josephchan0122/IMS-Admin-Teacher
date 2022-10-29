import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../../environments/environment";
import { Marketing } from '../models/marketing';
@Injectable({
  providedIn: 'root'
})
export class MarketingService {
  api_url = environment.API_URL;
  constructor(
    private httpClient:HttpClient
  ) { }
  public GetMarketings():Observable<any>{
    return this.httpClient.get(`${this.api_url}/marketings/`);
  }
  public deleteMarket(marketing:Marketing):Observable<any>{
    return this.httpClient.delete(`${this.api_url}/marketings/${marketing.id}/`)
  }
}
