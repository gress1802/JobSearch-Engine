import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { JobMarketDataService } from 'src/app/services/job-market-data.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-market-analysis',
  templateUrl: './market-analysis.component.html',
  styleUrls: ['./market-analysis.component.css']
})
export class MarketAnalysisComponent implements OnInit {

  constructor ( private jobMarketDataService: JobMarketDataService ) { }

  selectedOptionValue?: string = 'Data Science';
  
  //Parallel arrays to hold the career string with the corresponding series number
  careers : string[] = [ 'Data Science', 'Software Developer', 'Web Developer', 'Blockchain Engineers', 'Computer Hardware Engineer', 'Business Intelligence Analyst', 'Penetration Testers', 'Database Architect', 'Financial/Investment Analysis', 'Accountant/Auditor' ];
  careerSeries : string[] = [ '15-2051.00', '15-1252.00', '15-1254.00', '15-1299.07', '17-2061.00', '15-2051.01', '15-1299.04', '15-1243.00', '13-2051.00', '13-2011.00' ]
 
  //LINE CHART (1)
  lineChartData: ChartDataset[] = [
  ];
  
  lineChartLabels: string[] = [
  ];
  
  lineChartOptions: ChartOptions = {
    responsive: true,
  };
  
  lineChartColors: any[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ]
  
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: ChartType = 'line';
  //END LINE CHART

  //LINE CHART (2)
  projectionsChartData: ChartDataset[] = [
  ];
  projectionsChartLabels: string[] = [
  ];
  //END LINE CHART (2)

  ngOnInit() {
    this.fetchSalaryData();
    this.fetchProjectionsData();
  }

  fetchSalaryData() {
    if (this.selectedOptionValue) {
      let series = this.careerSeries[this.careers.indexOf(this.selectedOptionValue)];
      this.jobMarketDataService.fetchSalaryData(series).subscribe( data => {
        const wages = data.OccupationDetail.Wages.StateWagesList;
        const hourlyWages = wages.find((wage: { RateType: string; } ) => wage.RateType === 'Hourly');

        this.lineChartData = [
          { data: [hourlyWages.Pct10, hourlyWages.Pct25, hourlyWages.Median, hourlyWages.Pct75, hourlyWages.Pct90], label: 'Hourly Wages' },
        ];

        this.lineChartLabels = ['10%', '25%', 'Median', '75%', '90%'];
      });
    }
  }

  fetchProjectionsData() {
    if (this.selectedOptionValue) {
      let series = this.careerSeries[this.careers.indexOf(this.selectedOptionValue)];
      this.jobMarketDataService.fetchProjectionsData(series).subscribe( data => {
        const industries = data.Result.map((industry: any) => industry.Industry);
        const estimatedEmployment = data.Result.map((industry: any) => industry.EstimatedEmployment);
        const projectedEmployment = data.Result.map((industry: any) => industry.ProjectEmployment);

        this.projectionsChartData = [
          { data: estimatedEmployment, label: 'Estimated Employment' },
          { data: projectedEmployment, label: 'Projected Employment' }
        ];
        this.projectionsChartLabels = industries;
      });
    }
  }

  differentSelected() {
    this.fetchSalaryData();
    this.fetchProjectionsData();
  }
}
