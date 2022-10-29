import { AfterViewInit, Component, OnDestroy, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
// import { Student } from "../../../../student";
import { CONSTANTS } from "../../../../constants";
@Component({
  selector: 'ngx-echarts-pie',
  template: `
    <div echarts [options]="options" class="echart" *ngIf="seriesData.length > 0"></div>
  `,
})
export class EchartsPieComponent implements  OnDestroy, OnInit, OnChanges {
  // @Input() students:Student[]
  @Input() seriesData:[]
  @Input() seriesName:string
  options: any;
  themeSubscription: any;
  public dashboardItems:{key:string, value:string}[];
  
  constructor(private theme: NbThemeService) {
    this.dashboardItems = CONSTANTS.dashboardItems;
    this.seriesName=undefined;
  }
  ngOnInit(){
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['USA', 'Germany', 'France', 'Canada', 'Russia'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          
          {
            name: 'Countries',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: [
              { value: 335, name: 'Germany' },
              { value: 310, name: 'France' },
              { value: 234, name: 'Canada' },
              { value: 135, name: 'Russia' },
              { value: 1548, name: 'USA' },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };
      // this.PieByTypeOfHighSchool();
    });
  }

  ngOnChanges(changes:SimpleChanges){
    console.log("ngOnChanges")
    if(this.seriesData.length >0){
      console.log(this.seriesData)
      this.options.series[0].data=this.seriesData;
      this.options.series[0].name= this.seriesName
      let tmp_arr=[]
      this.seriesData.forEach(item=>{
        tmp_arr.push(item['name']);
      })
      this.options.legend.data = tmp_arr
      this.options = Object.assign({}, this.options);
      // this.PieByTypeOfHighSchool();
    }
  }

  PieByTypeOfHighSchool(){
    
    // if(! this.students)return;
    let typeListOfHighSchool = CONSTANTS.typeListOfHighSchool;
    let data={}    
    typeListOfHighSchool.forEach(type=>{
      if(type =='na'){
        data[type]={
          value:0,
          name:'Did not attend High School'
        }
      }else{
        data[type]={
          value:0,
          name:type[0].toUpperCase() + type.slice(1)
        }  
      }
    })
    
    // this.students.forEach((student:Student)=>{
    //   if(typeListOfHighSchool.lastIndexOf(student.typeOfHighSchool)>=0)
    //     data[student.typeOfHighSchool].value ++;
    //   else
    //     data['unknown'].value ++;
    // });
    this.options.legend.data = Object.keys(data);
    this.options.series[0].data = Object.values(data);
    this.options = Object.assign({}, this.options);
  }
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
