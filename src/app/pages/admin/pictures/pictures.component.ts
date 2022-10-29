import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Child, NameOfClass } from '../../../@core/models/child';
import { ChildService } from '../../../@core/services/child.service';

@Component({
  selector: 'ngx-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss']
})
export class PicturesComponent implements OnInit {
  children:Child[];
  currentClassName:NameOfClass; 
  constructor(
    private childService:ChildService,
    private router:Router,
    private route:ActivatedRoute
    ) {
  }

  ngOnInit(): void {
    
    this.currentClassName = this.childService.getCurrentClassName();
    this.childService.getChildrenByClassName(this.currentClassName).subscribe(data=>{
      this.children = data;
    })
  }
  onSelect(selectedChild:Child){
    this.router.navigate([selectedChild.id],{relativeTo:this.route})
  }

}
