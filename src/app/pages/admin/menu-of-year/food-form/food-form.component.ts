import { Component, OnInit, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {EventEmitter} from '@angular/core';
import { Food } from '../../../../@core/models/meal-menu';
import { isInvalidControl } from '../../../../@core/utils/form.util';

@Component({
  selector: 'ngx-food-form',
  templateUrl: './food-form.component.html',
  styleUrls: ['./food-form.component.scss']
})
export class FoodFormComponent implements OnInit, OnChanges{
  @Input() data:any;
  @Input() init:Food;
  @Output('onFoodSubmit') foodSubmitEvent = new EventEmitter<any>();

  public foodForm:FormGroup;
  constructor(    
    private fb: FormBuilder
  ) { 
    this.foodForm = this.fb.group({
      picture:['', Validators.required],
      pictureFile:[undefined],
      name: ['', Validators.required],
      description:['',Validators.nullValidator]
    })
  }

  ngOnInit(): void {
    if(this.init){
      this.foodForm.reset(this.init)
    }
  }
  ngOnChanges(changes: SimpleChanges):void{
    if('init' in changes){
      this.foodForm.reset(this.init);
    }
  }
  onSubmit(){
    this.foodForm.markAllAsTouched();
    if(this.foodForm.valid)
      this.foodSubmitEvent.emit(this.foodForm.value);
  }
  changeListener(event):void {
    console.log(event);
    if(event.target.files && event.target.files[0]){
      let reader = new FileReader();

      reader.onload = (event:any) => {
        this.foodForm.get('picture').setValue(event.target.result);        
      }
      this.foodForm.get('pictureFile').setValue(event.target.files[0]);
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  isInvalidControl = isInvalidControl;
  get picture():string{
    let srcImg = this.foodForm.get('picture').value;    
    return srcImg? srcImg : '';
  }
}
