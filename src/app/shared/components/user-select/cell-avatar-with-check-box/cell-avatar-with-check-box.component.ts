import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { USERROLE } from '../../../../@core/models/user';
@Component({
  selector: 'ngx-cell-avatar-with-check-box',
  templateUrl: './cell-avatar-with-check-box.component.html',
  styleUrls: ['./cell-avatar-with-check-box.component.scss']
})
export class CellAvatarWithCheckBoxComponent implements OnInit, ViewCell {

  @Input() value: string | number;
  @Input() rowData: any;
  constructor() { }

  ngOnInit(): void {
    // if(this.rowData.checked)
    //   this.rowData.checked = false;
  }
  getPicture(){
    let url='';
    if(this.rowData.role == USERROLE.Parent)
      url = this.rowData.child.photo
    else
      url = this.rowData.picture
    return url;
  }
  getName(){
    if(this.rowData.role == USERROLE.Parent)
      return this.rowData.child.first_name + ' ' + this.rowData.child.last_name;
    return this.rowData.first_name + ' ' + this.rowData.last_name;
  }
  onClick(){
    if(this.rowData.checked)
      this.rowData.checked = !this.rowData.checked;
    else
      this.rowData.checked = true;
  }
}
