import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'ngx-child-cell',
  templateUrl: './child-cell.component.html',
  styleUrls: ['./child-cell.component.scss']
})
export class ChildCellComponent implements OnInit, ViewCell {

  @Input() value: string | number;
  @Input() rowData: any;
  constructor() { }

  ngOnInit(): void {
    console.log(this.rowData);
  }
  
  onClick(){

  }

}
