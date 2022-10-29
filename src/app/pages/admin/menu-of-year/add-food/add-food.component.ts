import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MealMenuService } from "../../../../@core/services/meal-menu.service";
import { NbToastrService } from '@nebular/theme';
import { ToastService } from '../../../../@core/services/toast.service';

@Component({
  selector: 'ngx-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.scss']
})
export class AddFoodComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private toastrService:ToastService,
    private mealMenuService:MealMenuService
  ) { }

  ngOnInit(): void {
  }
  
  back(){
    this.router.navigate(['/menuofyear'])
  }
  onFoodSubmit($event){
    console.log($event);
    this.mealMenuService.addFood($event,$event.pictureFile).subscribe( data =>{
      if(data!='Error')
      {
        this.toastrService.success('New Food Added',"Success");
        this.back();  
      }
    });
  }
}
