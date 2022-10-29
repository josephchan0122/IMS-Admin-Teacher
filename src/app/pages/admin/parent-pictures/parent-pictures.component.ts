import { Component, OnInit } from '@angular/core';
import { User } from "../../../@core/models/user";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { PictureService } from "../../../@core/services/picture.service";
import { Lightbox } from 'ngx-lightbox';
import { NbUser } from '@nebular/auth';

@Component({
  selector: 'ngx-parent-pictures',
  templateUrl: './parent-pictures.component.html',
  styleUrls: ['./parent-pictures.component.scss']
})
export class ParentPicturesComponent implements OnInit {
  
  userId:number;
  pictures:any[];
  _album:any[];
  constructor(private route:ActivatedRoute,
              private router:Router,
              private _lightbox: Lightbox,
              private pictureService:PictureService) { }

  ngOnInit(): void {
    
    this.route.paramMap.pipe(switchMap(
      params => {
        this.userId = Number(params.get('id'));
        return this.pictureService.getPicturesOfChild(this.userId);
      }
    )).subscribe((data) => {
      this.pictures = data.pictures; 
      this._album=[]
      this.pictures.forEach(item=>{
        
        this._album.push({src:item});
      })     
    })
  }
  add(){
    this.router.navigate(['add'],{relativeTo:this.route});
  }
  open(index:number){
    this._lightbox.open(this._album,index, {
      centerVertically: true,
      fitImageInViewPort: false
    });
  }

}
