import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'ngx-food-cell',
  templateUrl: './food-cell.component.html',
  styleUrls: ['./food-cell.component.scss']
})
export class FoodCellComponent implements ViewCell, OnInit {
  @Input() value: string | number;
  @Input() rowData: any;
  constructor() { }

  ngOnInit(): void {
  }
  onClick(){
    if(this.rowData.checked)
      this.rowData.checked = !this.rowData.checked;
    else
      this.rowData.checked = true;
  }
}
