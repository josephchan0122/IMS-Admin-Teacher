import { Component, Input, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { YesNoDialogComponent } from '../../../../components/yes-no-dialog/yes-no-dialog.component';
import { UsersService } from "../../../../@core/services/users.service";
import { ViewCell } from 'ng2-smart-table';
import { User } from '../../../../@core/models/user';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastService } from '../../../../@core/services/toast.service';
@Component({
  selector: 'ngx-cell-avatar',
  templateUrl: './cell-avatar.component.html',
  styleUrls: ['./cell-avatar.component.scss']
})
export class CellAvatarComponent implements ViewCell, OnInit {

  @Input() value: string | number;
  @Input() rowData: User;
  
  constructor(private dialogService: NbDialogService, 
              private userSerivce:UsersService,
              private toastService:ToastService,
              private router:Router) { }

  ngOnInit(): void {
  }
  edit(){
    this.router.navigate([`/users/${this.rowData.id}`]);
  }
  delete() {
    this.dialogService.open(YesNoDialogComponent,{context:{
      title:'Are you going to delete?'
    }}).onClose.subscribe(ret=>{
      if(ret==true){
        this.userSerivce.deleteUser(this.rowData.id).subscribe(res=>{
          if(this.userSerivce.localSource){
            this.userSerivce.localSource.remove(this.rowData);
          }
          this.toastService.info("User has been deleted", "success");
        })
      }
    })
  }
}
