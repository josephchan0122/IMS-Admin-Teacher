import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { MiniClub } from '../../../@core/models/miniclub';
import { MiniClubService } from '../../../@core/services/mini-club.service';
import { ToastService } from '../../../@core/services/toast.service';
import { YesNoDialogComponent } from '../../../components/yes-no-dialog/yes-no-dialog.component';

@Component({
  selector: 'ngx-miniclub',
  templateUrl: './miniclub.component.html',
  styleUrls: ['./miniclub.component.scss']
})
export class MiniclubComponent implements OnInit {
  searchWord:string;
  clubInfos:MiniClub[];
  filteredInfos:MiniClub[];
  constructor(
    private miniClubService:MiniClubService,
    private router:Router,
    private route:ActivatedRoute,
    private toastrService:ToastService,
    private dialogService:NbDialogService,
  ) { }

  ngOnInit(): void {
    // this.miniClubService.getThisWeekMiniClub().subscribe(data => {this.clubInfos = data; this.filteredInfos = this.clubInfos;})
    this.miniClubService.getAllMiniClub().subscribe(data => {this.clubInfos = data; this.filteredInfos = this.clubInfos;})
  }
  onSearchWordChange(data){
    this.filteredInfos = this.clubInfos.filter((item:MiniClub)=>{return item.title.includes(this.searchWord)});
  }
  newMiniClubClick(){
    this.router.navigate(['new'],{relativeTo:this.route});
  }
  onDeleteClick(clubInfo:MiniClub){
    this.dialogService.open(YesNoDialogComponent,{context:{
      title:'Are you sure?'
    }}).onClose.subscribe(ret=>{
      if(ret==true){
        this.miniClubService.removeMiniClub(clubInfo).subscribe(_=>{
          this.clubInfos = this.clubInfos.reduce((retArr, item) =>{
            if(item.id != clubInfo.id)
              retArr.push(item);
            return retArr;
          },[])
          this.filteredInfos=this.clubInfos;
          this.toastrService.info('Mini Club has been deleted.','success')
        })
      }
    })

  }

}
