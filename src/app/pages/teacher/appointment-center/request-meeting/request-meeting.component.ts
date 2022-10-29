import { Component, OnInit } from '@angular/core';
import { Child } from '../../../../@core/models/child';
import { User } from '../../../../@core/models/user';
import { AppointmentService } from '../../../../@core/services/appointment.service';
import { ChildService } from '../../../../@core/services/child.service';
import { ToastService } from '../../../../@core/services/toast.service';
import { UsersService } from '../../../../@core/services/users.service';

@Component({
  selector: 'ngx-request-meeting',
  templateUrl: './request-meeting.component.html',
  styleUrls: ['./request-meeting.component.scss']
})
export class RequestMeetingComponent implements OnInit {
  teacher:User;
  children:Child[];
  selectedChildren:Child[];
  constructor(
    private appointmentService:AppointmentService,
    private toastService:ToastService,
    private childService:ChildService,
    private userService:UsersService,
  ) {
    this.selectedChildren=[];
   }


  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user:User)=>{
      this.teacher = user;
      this.childService.getChildsOfTeacher(this.teacher).subscribe((children=>{
        this.children = children;
      }))
    })
  }
  onSubmit(){
    this.toastService.success('Request has been sent succesfully', 'success');
  }
}
