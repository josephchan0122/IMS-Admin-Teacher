import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private translateService:TranslateService, private toastrService:NbToastrService) { }
  success(message, title){
    forkJoin(
      {
        msg:this.translateService.get(message),
        title: this.translateService.get(title)
      }
    ).subscribe(data=>{
      this.toastrService.success(data.msg, data.title)
    })
  }

  show(message, title){
    forkJoin(
      {
        msg:this.translateService.get(message),
        title: this.translateService.get(title)
      }
    ).subscribe(data=>{
      this.toastrService.show(data.msg, data.title)
    })
  }
  
  info(message, title){
    forkJoin(
      {
        msg:this.translateService.get(message),
        title: this.translateService.get(title)
      }
    ).subscribe(data=>{
      this.toastrService.info(data.msg, data.title)
    })
  }
  warning(message, title){
    forkJoin(
      {
        msg:this.translateService.get(message),
        title: this.translateService.get(title)
      }
    ).subscribe(data=>{
      this.toastrService.warning(data.msg, data.title)
    })
  }
}
