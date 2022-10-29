import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'ngx-cell-avatar',
  templateUrl: './cell-avatar.component.html',
  styleUrls: ['./cell-avatar.component.scss']
})
export class CellAvatarComponent implements ViewCell, OnInit {
  @Input() value: string | number;
  @Input() rowData: any;
  constructor() { }

  ngOnInit(): void {
    console.log(this.rowData);
  }
  
  onClick(){

  }
}
