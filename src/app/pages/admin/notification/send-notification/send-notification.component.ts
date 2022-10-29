import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../../../@core/services/notification.service';
import { isInvalidControl } from "../../../../@core/utils/form.util";
import { UsersService } from '../../../../@core/services/users.service';
import { User } from "../../../../@core/models/user";
import { ToastService } from '../../../../@core/services/toast.service';
@Component({
  selector: 'ngx-send-notification',
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.scss']
})
export class SendNotificationComponent implements OnInit {
  parents:User[];
  notificationForm:FormGroup;
  constructor(
    private fb:FormBuilder,
    private notificationService:NotificationService,
    private userService:UsersService,
    private toastService:ToastService,
    ){ 
      this.notificationForm = fb.group({
        to:[[],Validators.minLength(1)],
        subject:['', Validators.required],
        content: ['', Validators.required],
        is_child_broadcast:[false, Validators.nullValidator],        
      })
      this.parents = [];
    }

  ngOnInit(): void {
    this.userService.getParents().subscribe((users:User[])=>{
      this.parents=users;
    })
  }
  onSubmit(){
    this.notificationForm.markAllAsTouched();
    if(this.notificationForm.valid){
      console.log(this.notificationForm);
      let data = this.notificationForm.value;
      data.receivers=[]
      data.to.forEach(item => {
        data.receivers.push(item.id);
      });
      this.notificationService.sendNotification(data).subscribe(_=>{
        this.toastService.success('The notification has been sent','success');
      })
    }
    
  }
  isInvalidControl = isInvalidControl
}
