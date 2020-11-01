import { Component } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Chart } from 'angular-highcharts';

import { UserModel } from '../shared/auth/userModel';
import { AuthService } from '../shared/auth/auth.service';
import { OracleFrontierResults } from './oracleFrontierResults';
import { oracleAssetAllocationResults } from './oracleAssetAllocs';
import { oracleAssetStatsResults } from './oracleAssetStats';
import { oracleExpectedResults } from './oracleExpected';


@Component({
  selector: 'app-oracle',
  templateUrl: './oracle.component.html',
  styleUrls: ['./oracle.component.scss']
})

export class OracleComponent  {
  refreshDate : Date = new Date("2001-01-01");
  refreshDate_next : Date = new Date("2001-01-01");
  
  //Asset list
  assetClassList: string[];
  assetClassSelected : string = "Broad"
  assetClassSelectorDrop(newSortOrder: string){ 
        this.assetClassSelected = newSortOrder;
        //Load data
        this.pullingStatsCompositions();
        this.pullingAllocationsCompositions();
  }
  //Plot stats
  statsChartGroup : any;
  statsChartGroupFlag = null;
  public statsChartGroupOptions: any = {
        chart: {
            polar: true,
            type: 'line'
        },
        title:false,

        pane: {
            size: '80%'
        },
        
        xAxis: {
            categories: ['Return', 'Risk', 'Skewness', 'IR'],
            tickmarkPlacement: 'on',
            lineWidth: 0
        },
        
        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
        },
        
        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.2f}</b><br/>'
        },
        
        legend: false,
        
        series: [{
                name: 'Historic 5y',
                data: [4.30, 19, -3, 0.6],
                pointPlacement: 'on'
            }, {
                name: 'Historic 3y',
                data: [6.20, 12, -2.1, 0.4],
                pointPlacement: 'on'
            }, {
                name: 'Instantanous',
                data: [7.20, 15, -2.4, 0.9],
                pointPlacement: 'on'
            }, {
                name: 'Next month',
                data: [8.15, 16.2, -2.1, 0.3],
                pointPlacement: 'on'
            }, {
                name: 'Next 3y',
                data: [11.15, 17.2, -2.9, 0.85],
                pointPlacement: 'on'
            }, {
                name: 'Next 5y',
                data: [14.8, 12.2, -2.6, 1.2],
                pointPlacement: 'on'
            }, {
                name: 'Next 10y',
                data: [10.8, 17.2, -2.5, 1.4],
                pointPlacement: 'on'
            }
        ],
        
        responsive: {
            rules: [{
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                legend: {
                  align: 'center',
                  verticalAlign: 'bottom',
                  layout: 'horizontal'
                },
                pane: {
                  size: '70%'
                }
              }
            }]
        }
    };
  
  //Plot allocations
  allocationsChartGroup : any;
  allocationsChartGroupFlag = null;
  public allocationsChartGroupOptions: any = {
        chart: {
            polar: true,
            type: 'column'
        },
        title:{
            text: "Allocations"
        },

        pane: {
            size: '80%'
        },
        
        xAxis: {
            categories: ['Historic 5y', 'Historic 3y', 'Instantanous', 'Next month', 'Next 3y', 'Next 5y', 'Next 10y'],
            tickmarkPlacement: 'on',
            lineWidth: 0,
            min:0
        },
        
        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
        },
        
        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.2f}%</b><br/>'
        },
        
        legend: false,
        
        series: [{
                name: 'US Equities',
                data: [4.30, 19, 23, 16, 15, 15],
                pointPlacement: 'on'

            }, {
                name: 'EA Equities',
                data: [7.30, 12, 23, 16, 15, 15],
                pointPlacement: 'on'
            }, {
                name: 'Japan Equities',
                data: [7.30, 12, 23, 16, 15, 15],
                pointPlacement: 'on'
            }, {
                name: 'China Equities',
                data: [7.30, 12, 23, 16, 15, 15],
                pointPlacement: 'on'
            }, {
                name: 'EM Equities',
                data: [7.30, 12, 23, 16, 15, 15],
                pointPlacement: 'on'
            }, {
                name: 'DM Bonds',
                data: [7.30, 12, 23, 16, 15, 15],
                pointPlacement: 'on'
            }, {
                name: 'EM Bonds',
                data: [7.30, 12, 23, 16, 15, 15],
                pointPlacement: 'on'
            }, {
                name: 'Asia Bonds',
                data: [7.30, 12, 23, 16, 15, 15],
                pointPlacement: 'on'
            }, {
                name: 'Gold',
                data: [7.30, 12, 23, 16, 15, 15],
                pointPlacement: 'on'
            }, {
                name: 'Private Equity',
                data: [7.30, 12, 23, 16, 15, 15],
                pointPlacement: 'on'
            }, {
                name: 'G7 REITs',
                data: [7.30, 12, 23, 16, 15, 15],
                pointPlacement: 'on'
            }, {
                name: 'DM Dividends',
                data: [7.30, 12, 23, 16, 15, 15],
                pointPlacement: 'on'
            }, {
                name: 'EM Dividends',
                data: [7.30, 12, 23, 16, 15, 15],
                pointPlacement: 'on'
            }
        ],
        
        responsive: {
            rules: [{
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                legend: {
                  align: 'center',
                  verticalAlign: 'bottom',
                  layout: 'horizontal'
                },
                pane: {
                  size: '70%'
                }
              }
            }]
        },
        plotOptions: {
            series: {
              stacking: 'normal',
              shadow: false,
              groupPadding: 0,
              pointPlacement: 'on'
            }
        }
    };

  //Scenario list
  scenarioClassList: string[];
  scenarioClassSelected : string = "Baseline"
  scenarioClassSelectorDrop(newSortOrder: string){ 
      this.scenarioClassSelected = newSortOrder;
      //Load currencies
      this.pullCurrencies();
  }
  
  //Currency list
  currencyClassList: string[];
  currencyClassSelected : string = "USD"
  currencyClassSelectorDrop(newSortOrder: string){ 
        this.currencyClassSelected = newSortOrder;
        //Load data
        this.pullingFrontier();
  }
  
  //Frontier
  //5Y
  frontierChartGroup : any;
  frontierChartGroupFlag = null;
  public frontierChartGroupOptions: any = {
    chart: {
        type: 'spline'
    },
    title:false,
    xAxis: {
        reversed: false,
        title: {
          enabled: true,
          text: 'Risk'
        },
        labels: {
          format: '{value}%'
        },
        maxPadding: 0.05,
        showLastLabel: true
    },
    yAxis: {
        title: {
          text: 'Return'
        },
        labels: {
          format: '{value}%'
        },
        lineWidth: 2
    },
    legend: {
        enabled: false
    },
    tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x} %PA  {point.y}% std'
    },
    plotOptions: {
        spline: {
          marker: {
            enable: false
          }
        }
    },
    series: [
        {
            name: 'Historic 5y',
            data: [
                    [6.7, 2.9], 
                    [4, 3.9], 
                    [6.8, 8.3], 
                    [8.6, 9.8], 
                    [10.6, 10.1],
                    [12.3, 10.5], 
                    [14.8, 11.9], 
                    [16.4, 12] 
                    ]
        },
        {
            name: 'Forward 5y',
            data: [
                    [5, 2.6], 
                    [4, 3.4], 
                    [6, 8.7], 
                    [8, 9.2], 
                    [10, 10.8],
                    [12, 10.1], 
                    [14, 11.5], 
                    [16, 12.7] 
                    ]
        }
    ]
    };  
    
  //10Y
  frontier10ChartGroup : any;
  frontier10ChartGroupFlag = null;
  public frontier10ChartGroupOptions: any = {
    chart: {
        type: 'spline'
    },
    title:false,
    xAxis: {
        reversed: false,
        title: {
          enabled: true,
          text: 'Risk'
        },
        labels: {
          format: '{value}%'
        },
        maxPadding: 0.05,
        showLastLabel: true
    },
    yAxis: {
        title: {
          text: 'Return'
        },
        labels: {
          format: '{value}%'
        },
        lineWidth: 2
    },
    legend: {
        enabled: false
    },
    tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x} %PA  {point.y}% std'
    },
    plotOptions: {
        spline: {
          marker: {
            enable: false
          }
        }
    },
    series: [
        {
            name: 'Historic 10y',
            data: [
                    [2.1,4.5], 
                    [3.4, 4.2], 
                    [6.2, 8.7], 
                    [8.1, 9.6], 
                    [10.4, 10.8],
                    [12, 10.1], 
                    [14, 11.4], 
                    [16.6, 12.7] 
                    ]
        },
        {
            name: 'Forward 10y',
            data: [
                    [5.5, 2], 
                    [4.6, 3], 
                    [6.3, 8], 
                    [8.9, 9], 
                    [10.1, 10],
                    [12.5, 10.5], 
                    [14.7, 11], 
                    [16.9, 12] 
                    ]
        },
    ]
    };  
  
  //Return assumptions
  //Aggregate
  returnsChartAggGroup : any;
  returnsChartAggGroupFlag = null;
  public returnsChartAggGroupOptions: any = {
        chart: {
            type: 'columnrange'
        },
        
        title: {
            text: "Broad assets"
        },
        
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
                        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        
        yAxis: {
            title: {
              text: 'Returns expectations'
            }
        },
        
        tooltip: false,
        
        plotOptions: {
            columnrange: {
              dataLabels: {
                enabled: true,
                format: '{y}',
                fontSize: 8
              }
            }
        },
        
        legend: {
            enabled: false
        },
        
        series: [
            {
                name: '3Y returns',
                data: [
                    ]
            }, {
                name: '3Y returns with macro risks',
                data: [
                    ]
            },{
                name: '5Y returns',
                data: [
                    ]
            }, {
                name: '5Y returns with macro risks',
                data: [
                    ]
            },
             {
                name: '10Y returns',
                data: [
                    ]
            }, {
                name: '10Y returns with macro risks',
                data: [
                    ]
            },           
        ]

    };  
  //US Equities
  returnsChartUSGroup : any;
  returnsChartUSGroupFlag = null;
  public returnsChartUSGroupOptions: any = {
        chart: {
            type: 'columnrange'
        },
        
        title: {
            text: "US Equities"
        },
        
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
                        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        
        yAxis: {
            title: {
              text: 'Returns expectations'
            }
        },
                
        tooltip: false,
        
        plotOptions: {
            columnrange: {
              dataLabels: {
                enabled: true,
                format: '{y}',
                fontSize: 8
              }
            }
        },
        
        legend: {
            enabled: false
        },
        
        series: [
            {
                name: '3Y returns',
                data: [
                    ]
            }, {
                name: '3Y returns with macro risks',
                data: [
                    ]
            },{
                name: '5Y returns',
                data: [
                    ]
            }, {
                name: '5Y returns with macro risks',
                data: [
                    ]
            },
             {
                name: '10Y returns',
                data: [
                    ]
            }, {
                name: '10Y returns with macro risks',
                data: [
                    ]
            },           
        ]

    };  
  //EA Equities
  returnsChartEAGroup : any;
  returnsChartEAGroupFlag = null;
  public returnsChartEAGroupOptions: any = {
        chart: {
            type: 'columnrange'
        },
        
        title: {
            text: "EA Equities"
        },
        
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
                        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        
        yAxis: {
            title: {
              text: 'Returns expectations'
            }
        },
           
        tooltip: false,
        
        plotOptions: {
            columnrange: {
              dataLabels: {
                enabled: true,
                format: '{y}',
                fontSize: 8
              }
            }
        },
        
        legend: {
            enabled: false
        },
        
        series: [
            {
                name: '3Y returns',
                data: [
                    ]
            }, {
                name: '3Y returns with macro risks',
                data: [
                    ]
            },{
                name: '5Y returns',
                data: [
                    ]
            }, {
                name: '5Y returns with macro risks',
                data: [
                    ]
            },
             {
                name: '10Y returns',
                data: [
                    ]
            }, {
                name: '10Y returns with macro risks',
                data: [
                    ]
            },           
        ]

    };  
  //Japan Equities
  returnsChartJPGroup : any;
  returnsChartJPGroupFlag = null;
  public returnsChartJPGroupOptions: any = {
        chart: {
            type: 'columnrange'
        },
        
        title: {
            text: "Japan Equities"
        },
        
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
                        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        
        yAxis: {
            title: {
              text: 'Returns expectations'
            }
        },
           
        tooltip: false,
        
        plotOptions: {
            columnrange: {
              dataLabels: {
                enabled: true,
                format: '{y}',
                fontSize: 8
              }
            }
        },
        
        legend: {
            enabled: false
        },
        
        series: [
            {
                name: '3Y returns',
                data: [
                    ]
            }, {
                name: '3Y returns with macro risks',
                data: [
                    ]
            },{
                name: '5Y returns',
                data: [
                    ]
            }, {
                name: '5Y returns with macro risks',
                data: [
                    ]
            },
             {
                name: '10Y returns',
                data: [
                    ]
            }, {
                name: '10Y returns with macro risks',
                data: [
                    ]
            },           
        ]

    };  
  //China Equities
  returnsChartCNGroup : any;
  returnsChartCNGroupFlag = null;
  public returnsChartCNGroupOptions: any = {
        chart: {
            type: 'columnrange'
        },
        
        title: {
            text: "China Equities"
        },
        
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
                        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        
        yAxis: {
            title: {
              text: 'Returns expectations'
            }
        },
           
        tooltip: false,
        
        plotOptions: {
            columnrange: {
              dataLabels: {
                enabled: true,
                format: '{y}',
                fontSize: 8
              }
            }
        },
        
        legend: {
            enabled: false
        },
        
        series: [
            {
                name: '3Y returns',
                data: [
                    ]
            }, {
                name: '3Y returns with macro risks',
                data: [
                    ]
            },{
                name: '5Y returns',
                data: [
                    ]
            }, {
                name: '5Y returns with macro risks',
                data: [
                    ]
            },
             {
                name: '10Y returns',
                data: [
                    ]
            }, {
                name: '10Y returns with macro risks',
                data: [
                    ]
            },           
        ]

    };  
  //EM Equities
  returnsChartEMGroup : any;
  returnsChartEMGroupFlag = null;
  public returnsChartEMGroupOptions: any = {
        chart: {
            type: 'columnrange'
        },
        
        title: {
            text: "EM Equities"
        },
        
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
                        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        
        yAxis: {
            title: {
              text: 'Returns expectations'
            }
        },
           
        tooltip: false,
        
        plotOptions: {
            columnrange: {
              dataLabels: {
                enabled: true,
                format: '{y}',
                fontSize: 8
              }
            }
        },
        
        legend: {
            enabled: false
        },
        
        series: [
            {
                name: '3Y returns',
                data: [
                    ]
            }, {
                name: '3Y returns with macro risks',
                data: [
                    ]
            },{
                name: '5Y returns',
                data: [
                    ]
            }, {
                name: '5Y returns with macro risks',
                data: [
                    ]
            },
             {
                name: '10Y returns',
                data: [
                    ]
            }, {
                name: '10Y returns with macro risks',
                data: [
                    ]
            },           
        ]

    };  
  //DM Bonds
  returnsChartDMBondsGroup : any;
  returnsChartDMBondsGroupFlag = null;
  public returnsChartDMBondsGroupOptions: any = {
        chart: {
            type: 'columnrange'
        },
        
        title: {
            text: "DM Bonds"
        },
        
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
                        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        
        yAxis: {
            title: {
              text: 'Returns expectations'
            }
        },
           
        tooltip: false,
        
        plotOptions: {
            columnrange: {
              dataLabels: {
                enabled: true,
                format: '{y}',
                fontSize: 8
              }
            }
        },
        
        legend: {
            enabled: false
        },
        
        series: [
            {
                name: '3Y returns',
                data: [
                    ]
            }, {
                name: '3Y returns with macro risks',
                data: [
                    ]
            },{
                name: '5Y returns',
                data: [
                    ]
            }, {
                name: '5Y returns with macro risks',
                data: [
                    ]
            },
             {
                name: '10Y returns',
                data: [
                    ]
            }, {
                name: '10Y returns with macro risks',
                data: [
                    ]
            },           
        ]

    };  
  //EM Bonds
  returnsChartEMBondsGroup : any;
  returnsChartEMBondsGroupFlag = null;
  public returnsChartEMBondsGroupOptions: any = {
        chart: {
            type: 'columnrange'
        },
        
        title: {
            text: "EM Bonds"
        },
        
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
                        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        
        yAxis: {
            title: {
              text: 'Returns expectations'
            }
        },
           
        tooltip: false,
        
        plotOptions: {
            columnrange: {
              dataLabels: {
                enabled: true,
                format: '{y}',
                fontSize: 8
              }
            }
        },
        
        legend: {
            enabled: false
        },
        
        series: [
            {
                name: '3Y returns',
                data: [
                    ]
            }, {
                name: '3Y returns with macro risks',
                data: [
                    ]
            },{
                name: '5Y returns',
                data: [
                    ]
            }, {
                name: '5Y returns with macro risks',
                data: [
                    ]
            },
             {
                name: '10Y returns',
                data: [
                    ]
            }, {
                name: '10Y returns with macro risks',
                data: [
                    ]
            },           
        ]

    };
  
  //
  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private authenticationService: AuthService,
    private router: Router
    ) {
        this.frontierChartGroupFlag = true;
        this.frontier10ChartGroupFlag = true;
        this.allocationsChartGroupFlag = true;
        this.statsChartGroupFlag = false;
        this.returnsChartAggGroupFlag = false;
        
        this.returnsChartUSGroupFlag = false;
        this.returnsChartEAGroupFlag = false;
        this.returnsChartJPGroupFlag = false;
        this.returnsChartCNGroupFlag = false;
        this.returnsChartEMGroupFlag = false;
        
        this.returnsChartDMBondsGroupFlag = false;
        this.returnsChartEMBondsGroupOptions = false;
        //      this.authenticationService.doPing();
//      if (!this.authenticationService.currentUserValue) {
//          //No loging
//      }else{

        //Get scenarios
        //Load up
        this.http.get<string[]>('https://api.alphahuntsman.com/oracle/scenarios').subscribe((data_scenarios: string[]) => {
                this.scenarioClassList = new Array<string>();
                for(var t_stop of data_scenarios){
                    this.scenarioClassList.push(t_stop.replace("_"," "));
                }
                this.scenarioClassSelected = this.scenarioClassList[0];
                //Load currencies
                this.pullCurrencies();
            },
            (err) => {
                this.router.navigate(['/pages/maintenance']);
            });
        this.pullAssetClasses();
        this.pullingReturns();
    }
    
    pullCurrencies(){
        //Load currencies
        this.http.get<string[]>('https://api.alphahuntsman.com/oracle/currencies?scenario=' + this.scenarioClassSelected
            ).subscribe((data_currencies: string[]) => {
            this.currencyClassList = new Array<string>();
            for(var t_stop of data_currencies){
                this.currencyClassList.push(t_stop.replace("_"," "));
            }
            this.currencyClassSelected = this.currencyClassList[0];
            //
            //Load data
            this.pullingFrontier();
        });
    }

    pullAssetClasses(){
        //Load currencies
        this.http.get<string[]>('https://api.alphahuntsman.com/oracle/assets'
            ).subscribe((data_assets: string[]) => {
            this.assetClassList = new Array<string>();
            for(var t_stop of data_assets){
                this.assetClassList.push(t_stop.replace("_"," "));
            }
            this.assetClassSelected = "Broad";
            //
            //Load data
            this.pullingStatsCompositions();
            this.pullingAllocationsCompositions();
        });
        
    }
    
    pullingStatsCompositions(){
        //Load data
        this.http.get<oracleAssetStatsResults>('https://api.alphahuntsman.com/oracle/assetStats?asset=' + this.assetClassSelected
            ).subscribe((data_results: oracleAssetStatsResults) => {
                this.statsChartGroupOptions.series[0].data = [];
                this.statsChartGroupOptions.series[1].data = [];
                this.statsChartGroupOptions.series[2].data = [];
                this.statsChartGroupOptions.series[3].data = [];
                this.statsChartGroupOptions.series[4].data = [];
                this.statsChartGroupOptions.series[5].data = [];
                this.statsChartGroupOptions.series[6].data = [];
                //H5Y
                var t_inner_idx = 0;
                //Return, Risk, Skewness, IR
                let temp_risk = Number(data_results.Historic5y[0]);
                let temp_return= Number(data_results.Historic5y[1]);
                let temp_skewness = Number(data_results.Historic5y[2]);
                let temp_IR = Number(data_results.Historic5y[3]);
                this.statsChartGroupOptions.series[t_inner_idx].data = [
                    Math.round(temp_risk * 1000) / 1000,
                    Math.round(temp_return * 1000) / 1000,
                    Math.round(temp_skewness * 1000) / 1000,
                    Math.round(temp_IR * 1000) / 1000
                    ];
                //H3Y
                var t_inner_idx = 1;
                //Return, Risk, Skewness, IR
                temp_risk = Number(data_results.Historic3y[0]);
                temp_return= Number(data_results.Historic3y[1]);
                temp_skewness = Number(data_results.Historic3y[2]);
                temp_IR = Number(data_results.Historic3y[3]);
                this.statsChartGroupOptions.series[t_inner_idx].data = [
                    Math.round(temp_risk * 1000) / 1000,
                    Math.round(temp_return * 1000) / 1000,
                    Math.round(temp_skewness * 1000) / 1000,
                    Math.round(temp_IR * 1000) / 1000
                    ];
                //Instantenous
                var t_inner_idx = 2;
                //Return, Risk, Skewness, IR
                temp_risk = Number(data_results.Instantanous[0]);
                temp_return= Number(data_results.Instantanous[1]);
                temp_skewness = Number(data_results.Instantanous[2]);
                temp_IR = Number(data_results.Instantanous[3]);
                this.statsChartGroupOptions.series[t_inner_idx].data = [
                    Math.round(temp_risk * 1000) / 1000,
                    Math.round(temp_return * 1000) / 1000,
                    Math.round(temp_skewness * 1000) / 1000,
                    Math.round(temp_IR * 1000) / 1000
                    ];
                //Next Month
                var t_inner_idx = 3;
                //Return, Risk, Skewness, IR
                temp_risk = Number(data_results.NextMonth[0]);
                temp_return= Number(data_results.NextMonth[1]);
                temp_skewness = Number(data_results.NextMonth[2]);
                temp_IR = Number(data_results.NextMonth[3]);
                this.statsChartGroupOptions.series[t_inner_idx].data = [
                    Math.round(temp_risk * 1000) / 1000,
                    Math.round(temp_return * 1000) / 1000,
                    Math.round(temp_skewness * 1000) / 1000,
                    Math.round(temp_IR * 1000) / 1000
                    ];
                //Next 3Y
                var t_inner_idx = 4;
                //Return, Risk, Skewness, IR
                temp_risk = Number(data_results.Next3y[0]);
                temp_return= Number(data_results.Next3y[1]);
                temp_skewness = Number(data_results.Next3y[2]);
                temp_IR = Number(data_results.Next3y[3]);
                this.statsChartGroupOptions.series[t_inner_idx].data = [
                    Math.round(temp_risk * 1000) / 1000,
                    Math.round(temp_return * 1000) / 1000,
                    Math.round(temp_skewness * 1000) / 1000,
                    Math.round(temp_IR * 1000) / 1000
                    ];
                //Next 5Y
                var t_inner_idx = 5;
                //Return, Risk, Skewness, IR
                temp_risk = Number(data_results.Next5y[0]);
                temp_return= Number(data_results.Next5y[1]);
                temp_skewness = Number(data_results.Next5y[2]);
                temp_IR = Number(data_results.Next5y[3]);
                this.statsChartGroupOptions.series[t_inner_idx].data = [
                    Math.round(temp_risk * 1000) / 1000,
                    Math.round(temp_return * 1000) / 1000,
                    Math.round(temp_skewness * 1000) / 1000,
                    Math.round(temp_IR * 1000) / 1000
                    ];
                //Next 10Y
                var t_inner_idx = 6;
                //Return, Risk, Skewness, IR
                temp_risk = Number(data_results.Next10y[0]);
                temp_return= Number(data_results.Next10y[1]);
                temp_skewness = Number(data_results.Next10y[2]);
                temp_IR = Number(data_results.Next10y[3]);
                this.statsChartGroupOptions.series[t_inner_idx].data = [
                    Math.round(temp_risk * 1000) / 1000,
                    Math.round(temp_return * 1000) / 1000,
                    Math.round(temp_skewness * 1000) / 1000,
                    Math.round(temp_IR * 1000) / 1000
                    ];                
                //
                this.refreshDate = data_results.last_update 
                this.refreshDate_next = data_results.next_update;
                //
                this.statsChartGroup = new Chart(this.statsChartGroupOptions);
                this.statsChartGroupFlag = true;
      });
        
    }

    pullingAllocationsCompositions(){
        //Load data
        this.http.get<oracleAssetAllocationResults>('https://api.alphahuntsman.com/oracle/assetAllocs?asset=' + this.assetClassSelected
            ).subscribe((data_results: oracleAssetAllocationResults) => {
                this.allocationsChartGroupOptions.series = [];
                for(var t_inner_idx = 0; t_inner_idx < data_results.assetNames.length;t_inner_idx++){
                    let t_entry = {
                        name: data_results.assetNames[t_inner_idx],
                        pointPlacement: 'on',
                        data: [
                                Math.round(Number(data_results.Historic5y[t_inner_idx])*100*1000)/1000,
                                Math.round(Number(data_results.Historic3y[t_inner_idx])*100*1000)/1000,
                                Math.round(Number(data_results.Instantanous[t_inner_idx])*100*1000)/1000,
                                Math.round(Number(data_results.NextMonth[t_inner_idx])*100*1000)/1000,
                                Math.round(Number(data_results.Next3y[t_inner_idx])*100*1000)/1000,
                                Math.round(Number(data_results.Next5y[t_inner_idx])*100*1000)/1000,
                                Math.round(Number(data_results.Next10y[t_inner_idx])*100*1000)/1000
                            ]
                    };
                    this.allocationsChartGroupOptions.series.push(t_entry);
                }
                //
                this.refreshDate = data_results.last_update 
                this.refreshDate_next = data_results.next_update;
                //
                this.allocationsChartGroup = new Chart(this.allocationsChartGroupOptions);
                this.allocationsChartGroupFlag = true;
      });
    }
    
    pullingFrontier(){
        //Load data
        this.http.get<OracleFrontierResults>('https://api.alphahuntsman.com/oracle/frontier?scenario=' + this.scenarioClassSelected
            + '&currency=' + this.currencyClassSelected
            ).subscribe((data_results: OracleFrontierResults) => {
                //5Y
                this.frontierChartGroupOptions.series[0].data = [];
                this.frontierChartGroupOptions.series[1].data = [];
                //10Y
                this.frontier10ChartGroupOptions.series[0].data = [];
                this.frontier10ChartGroupOptions.series[1].data = [];
                for(var t_inner_idx = 0; t_inner_idx < data_results.historic_5_risk.length;t_inner_idx++){
                    //
                    //5Y
                    //
                    //Historic
                    let temp_risk = Number(data_results.historic_5_risk[t_inner_idx]);
                    let temp_return= Number(data_results.historic_5_return[t_inner_idx]);
                    let temp_skewness = Number(data_results.historic_5_skewness[t_inner_idx]);
                    //Forward
                    let temp_f_risk = Number(data_results.forward_5_risk[t_inner_idx]);
                    let temp_f_return= Number(data_results.forward_5_return[t_inner_idx]);
                    let temp_f_skewness = Number(data_results.forward_5_skewness[t_inner_idx]);
                    //Push
                    this.frontierChartGroupOptions.series[0].data.push([
                        Math.round(temp_risk * 1000) / 1000,
                        Math.round(temp_return * 1000) / 1000
                        ])
                    this.frontierChartGroupOptions.series[1].data.push([
                        Math.round(temp_f_risk * 1000) / 1000,
                        Math.round(temp_f_return * 1000) / 1000
                        ])
                    //
                    //10Y
                    //
                    //Historic
                    temp_risk = Number(data_results.historic_10_risk[t_inner_idx]);
                    temp_return= Number(data_results.historic_10_return[t_inner_idx]);
                    temp_skewness = Number(data_results.historic_10_skewness[t_inner_idx]);
                    //Forward
                    temp_f_risk = Number(data_results.forward_10_risk[t_inner_idx]);
                    temp_f_return= Number(data_results.forward_10_return[t_inner_idx]);
                    temp_f_skewness = Number(data_results.forward_10_skewness[t_inner_idx]);
                    //Push
                    this.frontier10ChartGroupOptions.series[0].data.push([
                        Math.round(temp_risk * 1000) / 1000,
                        Math.round(temp_return * 1000) / 1000
                        ])
                    this.frontier10ChartGroupOptions.series[1].data.push([
                        Math.round(temp_f_risk * 1000) / 1000,
                        Math.round(temp_f_return * 1000) / 1000
                        ])
                }
                this.frontierChartGroup = new Chart(this.frontierChartGroupOptions);
                this.frontierChartGroupFlag = true;
                //
                this.frontier10ChartGroup = new Chart(this.frontier10ChartGroupOptions);
                this.frontier10ChartGroupFlag = true;
                //
                this.refreshDate = data_results.last_update 
                this.refreshDate_next = data_results.next_update;
                //
      });

    }

    pullingReturns(){
        //Load data
        let t_group = "Broad"
        this.http.get<oracleExpectedResults>('https://api.alphahuntsman.com/oracle/getExpected?scenario=' + this.scenarioClassSelected
            + '&group=' + t_group
            ).subscribe((data_results: oracleExpectedResults) => {
            //
            this.returnsChartAggGroupOptions.xAxis.categories = data_results.assetNames;
            //3Y returns
            this.returnsChartAggGroupOptions.series[0].data = data_results.returns3y;
            this.returnsChartAggGroupOptions.series[1].data = data_results.returns3yFull;
            //5Y returns
            this.returnsChartAggGroupOptions.series[2].data = data_results.returns5y;
            this.returnsChartAggGroupOptions.series[3].data = data_results.returns5yFull;
            //10Y returns
            this.returnsChartAggGroupOptions.series[4].data = data_results.returns10y;
            this.returnsChartAggGroupOptions.series[5].data = data_results.returns10yFull;
            //Aggregate
            this.returnsChartAggGroup = new Chart(this.returnsChartAggGroupOptions);
            this.returnsChartAggGroupFlag = true;
        });
        //US Equities
        t_group = "US Equities"
        this.http.get<oracleExpectedResults>('https://api.alphahuntsman.com/oracle/getExpected?scenario=' + this.scenarioClassSelected
            + '&group=' + t_group
            ).subscribe((data_results: oracleExpectedResults) => {
            //
            this.returnsChartUSGroupOptions.xAxis.categories = data_results.assetNames;
            //3Y returns
            this.returnsChartUSGroupOptions.series[0].data = data_results.returns3y;
            this.returnsChartUSGroupOptions.series[1].data = data_results.returns3yFull;
            //5Y returns
            this.returnsChartUSGroupOptions.series[2].data = data_results.returns5y;
            this.returnsChartUSGroupOptions.series[3].data = data_results.returns5yFull;
            //10Y returns
            this.returnsChartUSGroupOptions.series[4].data = data_results.returns10y;
            this.returnsChartUSGroupOptions.series[5].data = data_results.returns10yFull;
            //Aggregate
            this.returnsChartUSGroup = new Chart(this.returnsChartUSGroupOptions);
            this.returnsChartUSGroupFlag = true;
        });
        //EA Equities
        t_group = "EA Equities"
        this.http.get<oracleExpectedResults>('https://api.alphahuntsman.com/oracle/getExpected?scenario=' + this.scenarioClassSelected
            + '&group=' + t_group
            ).subscribe((data_results: oracleExpectedResults) => {
            //
            this.returnsChartEAGroupOptions.xAxis.categories = data_results.assetNames;
            //3Y returns
            this.returnsChartEAGroupOptions.series[0].data = data_results.returns3y;
            this.returnsChartEAGroupOptions.series[1].data = data_results.returns3yFull;
            //5Y returns
            this.returnsChartEAGroupOptions.series[2].data = data_results.returns5y;
            this.returnsChartEAGroupOptions.series[3].data = data_results.returns5yFull;
            //10Y returns
            this.returnsChartEAGroupOptions.series[4].data = data_results.returns10y;
            this.returnsChartEAGroupOptions.series[5].data = data_results.returns10yFull;
            //Aggregate
            this.returnsChartEAGroup = new Chart(this.returnsChartEAGroupOptions);
            this.returnsChartEAGroupFlag = true;
        });
        //Japan Equities
        t_group = "Japan Equities"
        this.http.get<oracleExpectedResults>('https://api.alphahuntsman.com/oracle/getExpected?scenario=' + this.scenarioClassSelected
            + '&group=' + t_group
            ).subscribe((data_results: oracleExpectedResults) => {
            //
            this.returnsChartJPGroupOptions.xAxis.categories = data_results.assetNames;
            //3Y returns
            this.returnsChartJPGroupOptions.series[0].data = data_results.returns3y;
            this.returnsChartJPGroupOptions.series[1].data = data_results.returns3yFull;
            //5Y returns
            this.returnsChartJPGroupOptions.series[2].data = data_results.returns5y;
            this.returnsChartJPGroupOptions.series[3].data = data_results.returns5yFull;
            //10Y returns
            this.returnsChartJPGroupOptions.series[4].data = data_results.returns10y;
            this.returnsChartJPGroupOptions.series[5].data = data_results.returns10yFull;
            //Aggregate
            this.returnsChartJPGroup = new Chart(this.returnsChartJPGroupOptions);
            this.returnsChartJPGroupFlag = true;
        });
        //China Equities
        t_group = "China Equities"
        this.http.get<oracleExpectedResults>('https://api.alphahuntsman.com/oracle/getExpected?scenario=' + this.scenarioClassSelected
            + '&group=' + t_group
            ).subscribe((data_results: oracleExpectedResults) => {
            //
            this.returnsChartCNGroupOptions.xAxis.categories = data_results.assetNames;
            //3Y returns
            this.returnsChartCNGroupOptions.series[0].data = data_results.returns3y;
            this.returnsChartCNGroupOptions.series[1].data = data_results.returns3yFull;
            //5Y returns
            this.returnsChartCNGroupOptions.series[2].data = data_results.returns5y;
            this.returnsChartCNGroupOptions.series[3].data = data_results.returns5yFull;
            //10Y returns
            this.returnsChartCNGroupOptions.series[4].data = data_results.returns10y;
            this.returnsChartCNGroupOptions.series[5].data = data_results.returns10yFull;
            //Aggregate
            this.returnsChartCNGroup = new Chart(this.returnsChartCNGroupOptions);
            this.returnsChartCNGroupFlag = true;
        });
        //EM Equities
        t_group = "EM Equities"
        this.http.get<oracleExpectedResults>('https://api.alphahuntsman.com/oracle/getExpected?scenario=' + this.scenarioClassSelected
            + '&group=' + t_group
            ).subscribe((data_results: oracleExpectedResults) => {
            //
            this.returnsChartEMGroupOptions.xAxis.categories = data_results.assetNames;
            //3Y returns
            this.returnsChartEMGroupOptions.series[0].data = data_results.returns3y;
            this.returnsChartEMGroupOptions.series[1].data = data_results.returns3yFull;
            //5Y returns
            this.returnsChartEMGroupOptions.series[2].data = data_results.returns5y;
            this.returnsChartEMGroupOptions.series[3].data = data_results.returns5yFull;
            //10Y returns
            this.returnsChartEMGroupOptions.series[4].data = data_results.returns10y;
            this.returnsChartEMGroupOptions.series[5].data = data_results.returns10yFull;
            //Aggregate
            this.returnsChartEMGroup = new Chart(this.returnsChartEMGroupOptions);
            this.returnsChartEMGroupFlag = true;
        });
        //DM Bonds
        t_group = "DM Bonds"
        this.http.get<oracleExpectedResults>('https://api.alphahuntsman.com/oracle/getExpected?scenario=' + this.scenarioClassSelected
            + '&group=' + t_group
            ).subscribe((data_results: oracleExpectedResults) => {
            //
            this.returnsChartDMBondsGroupOptions.xAxis.categories = data_results.assetNames;
            //3Y returns
            this.returnsChartDMBondsGroupOptions.series[0].data = data_results.returns3y;
            this.returnsChartDMBondsGroupOptions.series[1].data = data_results.returns3yFull;
            //5Y returns
            this.returnsChartDMBondsGroupOptions.series[2].data = data_results.returns5y;
            this.returnsChartDMBondsGroupOptions.series[3].data = data_results.returns5yFull;
            //10Y returns
            this.returnsChartDMBondsGroupOptions.series[4].data = data_results.returns10y;
            this.returnsChartDMBondsGroupOptions.series[5].data = data_results.returns10yFull;
            //Aggregate
            this.returnsChartDMBondsGroup = new Chart(this.returnsChartDMBondsGroupOptions);
            this.returnsChartDMBondsGroupFlag = true;
        });
        //
    }

    ngOnInit() {
    }
}
