import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { BookStatus, ExchangeLibrary } from '../../../../@core/models/exchangelibrary';
import { isInvalidControl } from "../../../../@core/utils/form.util";

@Component({
  selector: 'ngx-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  @Input() initdata:ExchangeLibrary;
  @Output('onSubmit') submitEvent =  new EventEmitter<any>();
  bookForm:FormGroup;
  book:ExchangeLibrary;
  constructor(
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title:['', Validators.required],
      donator:['', Validators.nullValidator],
      picture:['', Validators.required],
      pictureFile:undefined,
      comment:['', Validators.nullValidator],
      status:[BookStatus.PRESENT, Validators.nullValidator]
    })
    if(!this.initdata)
    {
      this.initdata = {
        id:undefined,
        title:undefined,
        donator:undefined,
        picture:undefined,
        status:BookStatus.PRESENT
      }
    }else{
      this.bookForm.reset(this.initdata)
    }
  }

  changeListener(event):void {
    console.log(event);
    if(event.target.files && event.target.files[0]){
      let reader = new FileReader();

      reader.onload = (event:any) => {
        this.bookForm.get('picture').setValue(event.target.result);        
      }
      this.bookForm.get('pictureFile').setValue(event.target.files[0]);
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  get picture():string { return this.bookForm.get('picture').value}
  onFormSubmit(){
    this.bookForm.markAllAsTouched();
    if(this.bookForm.valid){
      this.book = Object.assign(this.initdata, this.bookForm.value);
      this.submitEvent.emit(this.book);
    }
  }
  isInvalidControl = isInvalidControl

}
