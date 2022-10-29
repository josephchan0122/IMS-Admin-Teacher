import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MealMenuService } from "../../../../@core/services/meal-menu.service";
import { NbToastrService } from '@nebular/theme';
import { switchMap } from 'rxjs/operators';
import { Food } from '../../../../@core/models/meal-menu';
import { ToastService } from '../../../../@core/services/toast.service';

@Component({
  selector: 'ngx-edit-food',
  templateUrl: './edit-food.component.html',
  styleUrls: ['./edit-food.component.scss']
})
export class EditFoodComponent implements OnInit {

  foodId:number;
  food:Food;
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private toastrService:ToastService,
    private mealMenuService:MealMenuService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(
        params => {
          this.foodId = Number(params.get('food_id'));
          return this.mealMenuService.getFoodById(this.foodId);
        }
      )
    ).subscribe((res:Food)=>{
      this.food = res;
    })
  }
  back(){
    this.router.navigate(['/menuofyear'])
  }
  onFoodSubmit($event){
    console.log($event);
    $event.id = this.foodId;
    this.mealMenuService.updateFood($event,$event.pictureFile).subscribe( _ =>{
      this.toastrService.success('Food has been Updated',"Success");
      this.back();
    });
  }
}
