import { Component, OnInit, Input } from '@angular/core';
import { Food } from '../../../../@core/models/meal-menu';

@Component({
  selector: 'ngx-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {
  @Input() food:Food;
  constructor() { }

  ngOnInit(): void {
  }

}
