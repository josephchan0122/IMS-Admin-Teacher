import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Food, MenuItem } from "../models/meal-menu";
import { Observable, of, BehaviorSubject } from 'rxjs';
import { foods,menuItems } from "../dummy";


@Injectable({
  providedIn: 'root'
})
export class MealMenuService {
  api_url = environment.API_URL;
  constructor(private httpClient:HttpClient) { 
  }

  addFood(food:Food,pictureFile:any):Observable<any>{
    if(pictureFile){
      const formData = new FormData();
      Object.keys(food).forEach((key)=>{
        formData.append(key, food[key]);
      })
      formData.set('picture', pictureFile);
      return this.httpClient.post(`${this.api_url}/foods/`, formData);
    }else{
      return of('Error')
    }
  }

  updateFood(food:Food,pictureFile:any):Observable<any>{
    const formData = new FormData();
    Object.keys(food).forEach((key)=>{
        formData.append(key, food[key]);
      })
    formData.delete('picture');
    if(pictureFile){      
      formData.append('picture', pictureFile);      
    }
    return this.httpClient.patch(`${this.api_url}/foods/${food.id}/`, formData);
  }
  deleteFoodFromMenu(food:Food, weekName:string, dayName:string):Observable<MenuItem>{
    let foodIds = [food.id];
    let data ={
      foods:foodIds,
      weekName:weekName,
      dayName:dayName
    }
    return this.httpClient.post<MenuItem>(`${this.api_url}/menuitems/removefoodfrommenu/`,data);
  }

  getAllMenuInformation():Observable<MenuItem[]>{
    return this.httpClient.get<MenuItem[]>(`${this.api_url}/menuitems/`);
  }

  addFoodToMenu(foods:Food[], weekName:string, dayName:string):Observable<MenuItem>{
    let foodIds = foods.map(item=>{return item.id});
    let data ={
      foods:foodIds,
      weekName:weekName,
      dayName:dayName
    }
    return this.httpClient.post<MenuItem>(`${this.api_url}/menuitems/AddFood/`,data);
  }

  getAllFoods():Observable<Food[]>{
    // return of(foods)
    return this.httpClient.get<Food[]>(`${this.api_url}/foods/`);
  }
  
  getFoodById(food_id:number):Observable<Food>{
    return this.httpClient.get<Food>(`${this.api_url}/foods/${food_id}/`);
  }
}
