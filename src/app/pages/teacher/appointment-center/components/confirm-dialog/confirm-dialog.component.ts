import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Appointment, AppointmentStatus } from '../../../../../@core/models/appointment';
import { stat } from 'fs';


@Component({
  selector: 'ngx-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  @Input() apnt:Appointment;
  comment:string;
  constructor(protected dialogRef: NbDialogRef<ConfirmDialogComponent>) { }
  ngOnInit(): void {
  }
  close(res):void{
    let status = undefined
    if(res === true){
      status = AppointmentStatus.CONFIRM
    }
    if(res === false){
      status = AppointmentStatus.DECLINE
    }
    this.dialogRef.close({
      comment:this.comment,
      status:status
    });
    
  }

}
