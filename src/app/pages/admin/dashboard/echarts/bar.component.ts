import { AfterViewInit, Component, OnDestroy, OnChanges, SimpleChanges, Input, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
// import { Student } from "../../../../student";
@Component({
  selector: 'ngx-echarts-bar',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsBarComponent implements OnInit, OnDestroy, OnChanges {
  // @Input() students:Student[]
  options: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
  }

  ngOnInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.primaryLight],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: ['WJA', 'HighSchool', 'College'],
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        series: [
          {
            name: 'count',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200],
          },
        ],
      };
      this.GetBarData();
    });
  }
  ngOnChanges(changes:SimpleChanges){
    if(this.options){
      this.GetBarData();
    }
  }
  GetBarData(){
    let data={
      'WJA':0,
      'HighSchool':0,
      'College':0
    }
    // if(this.students){
    //   this.students.forEach((student:Student)=>{
    //     if(student.isgrduateWJA == 'yes')
    //       data['WJA']++;
    //     if(student.isGraduated) data['HighSchool']++;
    //     if(student.isGraduatedCollege) data['College']++;
    //   })
    //   if(this.options)
    //   {
    //     this.options.series[0].data=Object.values(data);
    //     this.options = Object.assign({}, this.options);
    //   }
        
    // }
  }
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
