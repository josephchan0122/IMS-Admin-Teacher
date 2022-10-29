import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MiniClub } from '../../../../@core/models/miniclub';
import { MiniClubService } from '../../../../@core/services/mini-club.service';
import { ToastService } from '../../../../@core/services/toast.service';
@Component({
  selector: 'ngx-new-club',
  templateUrl: './new-club.component.html',
  styleUrls: ['./new-club.component.scss']
})
export class NewClubComponent implements OnInit {
  constructor(
    private miniClubService:MiniClubService,
    private route:ActivatedRoute,
    private toastrService:ToastService,
    private router:Router
    ){

  }
  ngOnInit(){

  }
  onSubmit(data:MiniClub){
    this.miniClubService.addNewMiniClub(data).subscribe(_=>{
      this.toastrService.success('New Mini Club Item has been created', 'success');
      this.back();
    });
  }
  back(){
    this.router.navigate(['..'],{relativeTo:this.route})
  }
}
