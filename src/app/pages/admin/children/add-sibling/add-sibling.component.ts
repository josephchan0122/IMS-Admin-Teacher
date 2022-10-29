import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { switchMap } from 'rxjs/operators';
import { Child, NameOfClass, SiblingChild } from '../../../../@core/models/child';
import { ChildService } from '../../../../@core/services/child.service';
import { ToastService } from '../../../../@core/services/toast.service';

@Component({
  selector: 'ngx-add-sibling',
  templateUrl: './add-sibling.component.html',
  styleUrls: ['./add-sibling.component.scss']
})
export class AddSiblingComponent implements OnInit {

  children:Child[]; // Children who are not siblings of childId
  childId:number;
  child:Child;
  currentClassName:NameOfClass; 
  selectedChildren:Child[];
  constructor(
    private childService:ChildService,
    private router:Router,
    private route:ActivatedRoute,
    private toastrService:ToastService
    ) {
  }

  ngOnInit(): void { 
    this.selectedChildren = [];
    
    this.currentClassName = this.childService.getCurrentClassName();
    this.route.paramMap.pipe(switchMap(
      params => {
        this.childId = Number(params.get('childId'));
        return this.childService.getAllChildren();
      }
    )).subscribe((data:Child[]) => {
      this.children = data.reduce((newData, child:Child)=>{
        if(child.id == this.childId)
          this.child = child;
        else if(!child.siblings.find((item:SiblingChild)=>{return item.id == this.childId})){
            newData.push(child);
          }
        
        return newData;
      }, []);
      console.log(this.children)  
    })
  }
  onSelect(selectedChild:Child){
    this.router.navigate([selectedChild.id],{relativeTo:this.route})
  }
  back(){
    this.router.navigate(['..'],{relativeTo:this.route});
  }
  onSubmit(){
    alert(this.selectedChildren.length);
    this.childService.AddSiblings(this.child, this.selectedChildren).subscribe(_=>{
      this.toastrService.success('Add Siblings Succesfully', 'success');
      this.router.navigate(['..'],{relativeTo:this.route});
      
    })
  }
}
