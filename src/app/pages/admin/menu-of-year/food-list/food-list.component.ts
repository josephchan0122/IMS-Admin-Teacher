import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { Food } from '../../../../@core/models/meal-menu';
import { FoodCellComponent } from './food-cell/food-cell.component';
@Component({
  selector: 'ngx-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss']
})
export class FoodListComponent implements OnInit {
  @Input() foods:Food[];
  searchWord:string;
  selectedFoods:Food[];
  foods_src: LocalDataSource;
  settings = {
    actions:{
      add:false,
      edit:false,
      delete:false,
      position:'right'
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    hideSubHeader:true,
    hideHeader:true,
    pager:{
      perPage:4
    },
    columns: {
      picture:{
        type: 'custom',
        renderComponent: FoodCellComponent,
      },
      
    },
  };
  constructor(protected dialogRef: NbDialogRef<FoodListComponent>) { }

  ngOnInit(): void {
    this.foods_src = new LocalDataSource(this.foods);
    this.selectedFoods = [];
  }
  
  close(res): void{
    if(res == true)
      this.dialogRef.close(this.selectedFoods)
    else
      this.dialogRef.close([]);
  }

  onSearchWordChange(newWord:string){
    this.searchWord = newWord;
    if(this.searchWord){

      this.foods_src.setFilter([{field:'name',search:this.searchWord}], false);    
    }else{
      this.foods_src.setFilter(null);
    }    
  }

  onRowSelect(event){
    let index = this.selectedFoods.findIndex((item:Food)=>{
      return item.id == event.data.id;
    })
    if(index != -1){
      this.selectedFoods.splice(index,1);
    }else
      this.selectedFoods.push(event.data);
  }
}
