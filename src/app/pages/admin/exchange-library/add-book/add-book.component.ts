import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExchangeLibrary } from '../../../../@core/models/exchangelibrary';
import { ExchangeLibraryService } from '../../../../@core/services/exchange-library.service';
import { ToastService } from '../../../../@core/services/toast.service';

@Component({
  selector: 'ngx-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  constructor(
    private exchangeLibraryService:ExchangeLibraryService,
    private toastSerivce:ToastService,
    private route:ActivatedRoute,
    private router:Router
    ){

  }
  ngOnInit(){

  }
  onSubmit(data:ExchangeLibrary){
    this.exchangeLibraryService.addBook(data).subscribe(_=>{            
      this.toastSerivce.success('New Book has been added','success');
      this.back();
    });
  }
  back(){
    this.router.navigate(['..'],{relativeTo:this.route})
  }

}
