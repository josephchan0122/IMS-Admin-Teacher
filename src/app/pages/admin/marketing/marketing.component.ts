import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Marketing } from '../../../@core/models/marketing';
import { MarketingService } from '../../../@core/services/marketing.service';
import { ToastService } from '../../../@core/services/toast.service';
import { YesNoDialogComponent } from '../../../components/yes-no-dialog/yes-no-dialog.component';

@Component({
  selector: 'ngx-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.scss']
})
export class MarketingComponent implements OnInit {

  searchWord:string;
  marketings:Marketing[];
  filteredMarketings:Marketing[];
  constructor(
    private marketingService:MarketingService,
    private dialogService:NbDialogService,
    private toastService:ToastService,
  ) { }

  ngOnInit(): void {
    this.marketingService.GetMarketings().subscribe(data=>{
      this.marketings = data;
      this.filteredMarketings = this.marketings;
    })
  }
  onSearchWordChange(data:string){
    this.filteredMarketings = this.marketings.filter((item:Marketing)=>{
      return item.question.toLowerCase().includes(data.toLowerCase())
    });
  }

  onDeleteClick(marketing:Marketing){
    this.dialogService.open(YesNoDialogComponent,{
      context:{
        title:'Are you sure?'
      }
    }).onClose.subscribe(ret=>{
      if(ret){
        this.marketingService.deleteMarket(marketing).subscribe(_=>{
          this.toastService.info('Marketing data has been removed','success');
        })
      }
    })
    
  }

}
