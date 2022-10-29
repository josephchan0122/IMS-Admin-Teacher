import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { WeekNameList,DayNameListForMenu } from "../../../@core/constants";
import { MealMenuService } from "../../../@core/services/meal-menu.service";
import { Food, MenuItem } from '../../../@core/models/meal-menu';
import { FindAndRemoveByPropery } from "../../../@core/utils/array.util";
import { YesNoDialogComponent } from "../../../components/yes-no-dialog/yes-no-dialog.component";
import { FoodListComponent } from './food-list/food-list.component';
import { foods as dummyFoods} from "../../../@core/dummy";
import { ToastService } from '../../../@core/services/toast.service';

@Component({
  selector: 'ngx-menu-of-year',
  templateUrl: './menu-of-year.component.html',
  styleUrls: ['./menu-of-year.component.scss']
})
export class MenuOfYearComponent implements OnInit {
  weekNameList;
  dayNameList;
  selectedWeek:string;
  selectedDay:string;
  selectedFoods:Food[];
  menuInformations: MenuItem[];
  constructor(
    private mealMenuService:MealMenuService,
    private dialogService:NbDialogService,
    private toastrService:ToastService,
    private route:ActivatedRoute,
    private router:Router,
    ) { 
    this.weekNameList = WeekNameList;
    this.dayNameList = DayNameListForMenu;
    this.selectedWeek = this.weekNameList[0].key;
    this.selectedDay = this.dayNameList[0];
    this.menuInformations = [];

  }

  ngOnInit(): void {
    this.mealMenuService.getAllMenuInformation().subscribe(res=>{
      this.menuInformations = res;
      this._updateSelectedFoods();
    })
  }
  _updateSelectedFoods(){
    if(this.selectedDay && this.selectedWeek){
      let findedItem:MenuItem = this.menuInformations.find((item:MenuItem)=>{
        return (item.dayName == this.selectedDay && item.weekName == this.selectedWeek);
      })
      this.selectedFoods =[]
      if(findedItem){
        this.selectedFoods = findedItem.foods;
      }
    }
  }
  onWeekChange($event){
    this.selectedWeek = $event;
    this._updateSelectedFoods();
  }
  onDayChange($event){
    this.selectedDay = $event;
    this._updateSelectedFoods();
  }
  onAddFood(){
    this.mealMenuService.getAllFoods().subscribe((foods:Food[]) => {
      
      this.dialogService.open(FoodListComponent,{
        context:{
          foods:foods
        }
      }).onClose.subscribe((selectedFoods:Food[])=>{
        console.log(selectedFoods);
        if(selectedFoods.length > 0)
          this.mealMenuService.addFoodToMenu(selectedFoods, this.selectedWeek, this.selectedDay).subscribe((item:MenuItem)=>{
            this.selectedFoods = item.foods;          
          });
      })
    })
    
  }
  onFoodDelete(food:Food){  // Remove Food From menu.
    this.dialogService.open(YesNoDialogComponent,{
      context:{title:"Are you sure?"}
    }).onClose.subscribe(ret=>{
      if(ret==true){
        this.mealMenuService.deleteFoodFromMenu(food, this.selectedWeek,this.selectedDay).subscribe(_ => {
          this.toastrService.success('Food is removed from Menu',"Success");
          this.selectedFoods = FindAndRemoveByPropery(this.selectedFoods, food);
        });
      }
    });
  }
  onFoodEdit(food:Food){  // Remove Food From menu.
    this.router.navigate([`/menuofyear/food/edit/${food.id}`]);
  }
}
