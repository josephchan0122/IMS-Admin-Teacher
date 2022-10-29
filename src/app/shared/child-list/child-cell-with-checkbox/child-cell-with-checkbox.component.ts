import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-child-cell-with-checkbox',
  templateUrl: './child-cell-with-checkbox.component.html',
  styleUrls: ['./child-cell-with-checkbox.component.scss']
})
export class ChildCellWithCheckboxComponent implements OnInit {

  @Input() value: string | number;
  @Input() rowData: any;
  constructor() { }

  ngOnInit(): void {
  }


}
