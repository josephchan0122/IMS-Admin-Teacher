import { Component, OnInit, Input, Output, ElementRef,EventEmitter } from '@angular/core';


import * as moment from "moment";
@Component({
  selector: 'ngx-preset-slot-item',
  templateUrl: './preset-slot-item.component.html',
  styleUrls: ['./preset-slot-item.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class PresetSlotItemComponent implements OnInit {
  @Input() start:Date;
  @Input() end:Date
  @Input() isCurrentChild:boolean;
  @Input('confirmed') isConfirmed:boolean;
  @Output() confirmClick = new EventEmitter();
  moment = moment;
  isflipped = false;
  constructor(private _eref:ElementRef) { 
    this.isConfirmed = false;
  }

  get formateTime(){
    return moment(this.start).format('LT');
  }

  ngOnInit(): void {
    
    // if( Math.floor(Math.random()*10)%2 == 0)
    //   this.isConfirmed = false;
    // else
    //   this.isConfirmed = true;
  }
  onClick(event){
    if(!this._eref.nativeElement.contains(event.target)){
      this.isflipped = false;      
    }   
  }
  onConfirm(){
    this.confirmClick.emit({start:this.start, end:this.end});
  }
}
