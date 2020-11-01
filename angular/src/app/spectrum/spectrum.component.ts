import { Component } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Chart } from 'angular-highcharts';
import { MapChart } from 'angular-highcharts';
import { StockChart } from 'angular-highcharts';

import { UserModel } from '../shared/auth/userModel';
import { AuthService } from '../shared/auth/auth.service';
import { SpectrumResults } from './spectrumResultsModel';
import { SpectrumResultsFundamentals } from './spectrumResultsFundamentalsModel';
import { SpectrumResultsBroad } from './spectrumResultsBroadModel';
import { SpectrumResultsTAAIn } from './spectrumResultsTAAInModel';

export interface Returns_Details{
    time_point: string;
    value_mean : number;
    value_lower : number;
    value_upper: number;
};

@Component({
  selector: 'app-spectrum',
  templateUrl: './spectrum.component.html',
  styleUrls: ['./spectrum.component.scss']
})

export class SpectrumComponent  {
  //
  //Aggregate views
  //
  //Bubbles
  bubbleChartPlot: any;
  bubbleChartPlotFlag = null;
  public bubbleChartPlotOptions: any = {
        chart: {
            type: 'packedbubble',
            height: '80%'
        },
        legend:{
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top'
        },
        title: {
            text: 'Within group tilts'
        },
        tooltip: {
            useHTML: true,
            pointFormat: '<b>{point.name}:</b> {point.value:,.2f}%'
        },
        plotOptions: {
            packedbubble: {
              minSize: '20%',
              maxSize: '100%',
              zMin: 0,
              zMax: 1000,
              layoutAlgorithm: {
                gravitationalConstant: 0.05,
                splitSeries: true,
                seriesInteraction: false,
                dragBetweenSeries: true,
                parentNodeLimit: true,
                enableSimulation: false
              },
              dataLabels: {
                enabled: true,
                format: '{point.name}',
                filter: {
                  property: 'y',
                  operator: '>',
                  value: 250
                },
                style: {
                  color: 'black',
                  textOutline: 'none',
                  fontWeight: 'normal'
                }
              }
            }
        },
        series: [
            {
                name: 'US Equities',
                data: [
                    {
                      name: 'Germany',
                      value: 767.1
                    }, {
                      name: 'Croatia',
                      value: 20.7
                    }
                    ]
            }, {
                name: 'EA Equities',
                data: [
                    {
                      name: 'Germany',
                      value: 767.1
                    }, {
                      name: 'Croatia',
                      value: 20.7
                    }
                ]

            }, {
                name: 'Japan Equities',
                data: [
                    {
                      name: 'Germany',
                      value: 767.1
                    }, {
                      name: 'Croatia',
                      value: 20.7
                    }
                ]

            }, {
                name: 'China Equities',
                data: [
                    {
                      name: 'Germany',
                      value: 767.1
                    }, {
                      name: 'Croatia',
                      value: 20.7
                    }
                ]

            }, {
                name: 'US Bonds',
                data: [
                    {
                      name: 'Germany',
                      value: 767.1
                    }, {
                      name: 'Croatia',
                      value: 20.7
                    }
                ]

            }, {
                name: 'EA Bonds',
                data: [
                    {
                      name: 'Germany',
                      value: 767.1
                    }, {
                      name: 'Croatia',
                      value: 20.7
                    }
                ]

            }, {
                name: 'Japan Bonds',
                data: [
                    {
                      name: 'Germany',
                      value: 767.1
                    }, {
                      name: 'Croatia',
                      value: 20.7
                    }
                ]

            }, {
                name: 'China Bonds',
                data: [
                    {
                      name: 'Germany',
                      value: 767.1
                    }, {
                      name: 'Croatia',
                      value: 20.7
                    }
                ]

            }, {
                name: 'EM Bonds',
                data: [
                    {
                      name: 'Germany',
                      value: 767.1
                    }, {
                      name: 'Croatia',
                      value: 20.7
                    }
                ]

            }, {
                name: 'Misc',
                data: [
                    {
                      name: 'Germany',
                      value: 767.1
                    }, {
                      name: 'Croatia',
                      value: 20.7
                    }
                ]
            }
        ]
    };
  
  //Leverage
  leverageChartPlot: any;
  leverageChartPlotFlag = null;
  public leverageChartPlotOptions: any = {
        chart: {
            polar: true,
            type: 'line'
        },
        
        title: {
            text: 'Leverage',
            x: -80
        },
        
        pane: {
            size: '80%'
        },
        
        xAxis: {
            categories: ['Sales', 'Marketing', 'Development', 'Customer Support','Information Technology', 'Administration'],
            tickmarkPlacement: 'on',
            lineWidth: 0
        },
        
        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
        },
        
        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.2f}</b><br/>'
        },
        
        legend: false,
        
        series: [
            {
                name: 'Optimal leverage',
                data: [43000, 19000, 60000, 35000, 17000, 10000],
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
  
  //tilts
  tiltsChartPlot: any;
  tiltsChartPlotFlag = null;
  public tiltsChartPlotOptions: any = {
        chart: {
            polar: true,
            type: 'line'
        },
        
        title: {
            text: 'Tilts',
            x: -80
        },
        
        pane: {
            size: '80%'
        },
        
        xAxis: {
            categories: ['Sales', 'Marketing', 'Development', 'Customer Support',
              'Information Technology', 'Administration'],
            tickmarkPlacement: 'on',
            lineWidth: 0
        },
        
        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
        },
        
        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.2f}</b><br/>'
        },
        
        legend: false,
        
        series: [
            {
                name: 'Allocated Budget',
                data: [43000, 19000, 60000, 35000, 17000, 10000],
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
    
  //Returns table
  returnsTableFlag = null;
  returnsTableData : Returns_Details[];
  
  //Plot returns future
  lineChartPriceFuture : any;
  lineChartPriceFutureFlag = null;
  public lineChartPriceFutureOptions: any = {
        title: {
            text: null
        },
        rangeSelector: {
            enabled:false
        },
        yAxis: {
            title: {
                text: "Annualized Returns"
            }
        },

        tooltip: {
            crosshairs: true,
            shared: true,
            pointFormat: "{series.name}: {point.y:.2f} %"
        },

        legend: {
            enabled: false
        },

        series: [{
            name: 'Central point',
            color: "#009DA0",
            data: []
        },{
            name: 'Upper central bound',
            color: "#009DA0",
            data: []
        },{
            name: 'Lower central bound',
            color: "#009DA0",
            data: []
        },{
            name: 'Upper bound',
            color: "#009DA0",
            data: []
        },{
            name: 'Lower bound',
            color: "#009DA0",
            data: []
        }]
    };

  //Plot returns gap
  lineChartPriceGap : any;
  lineChartPriceGapFlag = null;
  public lineChartPriceGapOptions: any = {
        title: {
            text: null
        },
        rangeSelector: {
            enabled:false
        },
        yAxis: {
            title: {
                text: "Positive - undervalued"
            }
        },

        tooltip: {
            crosshairs: true,
            shared: true,
            pointFormat: "{series.name}: {point.y:.2f} %"
        },

        legend: {
            enabled: false
        },

        series: [{
            name: 'Monthly gap',
            color: "#000000",
            data: []
        },{
            name: 'Quarterly gap',
            color: "#000000",
            data: []
        },{
            name: 'Annual gap',
            color: "#000000",
            data: []
        }]
    };

  //Fundamentals predictions
  lineChartPriceDecomposeMacro : any;
  lineChartPriceDecomposeMacroFlag = null;
  public lineChartPriceDecomposeMacroOptions: any = {
        title: {
            text: null
        },
        rangeSelector: {
            enabled:false
        },
        yAxis: {
            title: {
                text: "Relevant units"
            }
        },

        tooltip: {
            crosshairs: true,
            shared: true,
            pointFormat: "{series.name}: {point.y:.2f}"
        },

        legend: {
            enabled: false
        },

        series: []
    };
  
  //Plot price decomposition macro
  lineChartPriceDecomposeMacroCont : any;
  lineChartPriceDecomposeMacroContFlag = null;
  public lineChartPriceDecomposeMacroContOptions: any = {
        title: {
            text: null
        },
        rangeSelector: {
            enabled:false
        },
        yAxis: {
            title: {
                text: "Contributions"
            }
        },

        tooltip: {
            crosshairs: true,
            shared: true,
            pointFormat: "{series.name}: {point.y:.2f}"
        },

        legend: {
            enabled: false
        },

        series: []
    };
  
  //Plot price decomposition macro
  lineChartPriceDecomposeMacroCDF : any;
  lineChartPriceDecomposeMacroCDFFlag = null;
  public lineChartPriceDecomposeMacroCDFOptions: any = {
        title: {
            text: null
        },
        rangeSelector: {
            enabled:false
        },
        yAxis: {
            title: {
                text: "Percentiles"
            }
        },

        tooltip: {
            crosshairs: true,
            shared: true,
            pointFormat: "{series.name}: {point.y:.2f}"
        },

        legend: {
            enabled: false
        },

        series: []
    };

  //Plot price, implied price
  lineChartGrowth : any;
  lineChartGrowthFlag = null;
  public lineChartGrowthOptions: any = {
        title: {
            text: null
        },
        rangeSelector: {
            enabled:false
        },
        yAxis: {
            title: {
                text: "Positive - undervalued"
            }
        },

        tooltip: {
            crosshairs: true,
            shared: true,
            pointFormat: "{series.name}: {point.y:.2f}"
        },

        legend: {
            enabled: false
        },

        series: [{
            name: 'Weekly',
            color: "#000000",
            data: []
        },{
            name: 'Monthly',
            color: "#000000",
            data: []
        },{
            name: 'Quarterly',
            color: "#000000",
            data: []
        }]
    };
  
  //Plot weekly macro decompositons
  lineChartWeeklyMacroDecomposition : any;
  lineChartWeeklyMacroDecompositionFlag = null;
  public lineChartWeeklyMacroDecompositionOptions: any = {
        title: {
            text: null
        },
        rangeSelector: {
            enabled:false
        },
        yAxis: {
            title: {
                text: "Contributions"
            }
        },

        tooltip: {
            crosshairs: true,
            shared: true,
            pointFormat: "{series.name}: {point.y:.2f}"
        },

        legend: {
            enabled: false
        },

        series: []
    };

  //Plot monthly macro decompositons
  lineChartmonthlyMacroDecomposition : any;
  lineChartmonthlyMacroDecompositionFlag = null;
  public lineChartmonthlyMacroDecompositionOptions: any = {
        title: {
            text: null
        },
        rangeSelector: {
            enabled:false
        },
        yAxis: {
            title: {
                text: "Contributions"
            }
        },

        tooltip: {
            crosshairs: true,
            shared: true,
            pointFormat: "{series.name}: {point.y:.2f}"
        },

        legend: {
            enabled: false
        },

        series: []
    };

  //Plot monthly macro decompositons
  lineChartquarterlyMacroDecomposition : any;
  lineChartquarterlyMacroDecompositionFlag = null;
  public lineChartquarterlyMacroDecompositionOptions: any = {
        title: {
            text: null
        },
        rangeSelector: {
            enabled:false
        },
        yAxis: {
            title: {
                text: "Contributions"
            }
        },

        tooltip: {
            crosshairs: true,
            shared: true,
            pointFormat: "{series.name}: {point.y:.2f}"
        },

        legend: {
            enabled: false
        },

        series: []
    };

  //Plot weekly macro decompositons
  lineChartWeeklyGrowthDecomposition : any;
  lineChartWeeklyGrowthDecompositionFlag = null;
  public lineChartWeeklyGrowthDecompositionOptions: any = {
        title: {
            text: null
        },
        rangeSelector: {
            enabled:false
        },
        yAxis: {
            title: {
                text: "Positive - undervalued"
            }
        },

        tooltip: {
            crosshairs: true,
            shared: true,
            pointFormat: "{series.name}: {point.y:.2f}"
        },

        legend: {
            enabled: false
        },

        series: []
    };

  //Plot monthly macro decompositons
  lineChartMonthlyGrowthDecomposition : any;
  lineChartMonthlyGrowthDecompositionFlag = null;
  public lineChartMonthlyGrowthDecompositionOptions: any = {
        title: {
            text: null
        },
        rangeSelector: {
            enabled:false
        },
        yAxis: {
            title: {
                text: "Positive - undervalued"
            }
        },

        tooltip: {
            crosshairs: true,
            shared: true,
            pointFormat: "{series.name}: {point.y:.2f}"
        },

        legend: {
            enabled: false
        },

        series: []
    };
  
  //Plot monthly macro decompositons
  lineChartQuarterlyGrowthDecomposition : any;
  lineChartQuarterlyGrowthDecompositionFlag = null;
  public lineChartQuarterlyGrowthDecompositionOptions: any = {
        title: {
            text: null
        },
        rangeSelector: {
            enabled:false
        },
        yAxis: {
            title: {
                text: "Positive - undervalued"
            }
        },

        tooltip: {
            crosshairs: true,
            shared: true,
            pointFormat: "{series.name}: {point.y:.2f}"
        },

        legend: {
            enabled: false
        },

        series: []
    };
  
  refreshDate : Date = new Date("2001-01-01");
  refreshDate_next : Date = new Date("2001-01-01");
  spectrumResultsLatest : SpectrumResults;
  spectrumResultsFundamentalsLatest : SpectrumResultsFundamentals;

  //Asset class list
  assetClassList: string[];
  assetClassSelected : string = "Bonds"
  assetClassSelectorDrop(newSortOrder: string){ 
      this.assetClassSelected = newSortOrder;
      //Load countries
      this.pullCountries();
  }
  
  //Country list
  countryList: string[];
  countrySelected : string = "World"
  countrySelectorDrop(newSortOrder: string){ 
      this.countrySelected = newSortOrder;
      //Load Sector
      this.pullSectors();
  }
  //Sector list  
  selectedSector: string= "Aggregate";
  sectorList: string[];
  sectorSelectorDrop(newSortOrder: string){
      this.selectedSector = newSortOrder;
      //Load Scenario
      this.pullScenarios();
  }
  //Scenario selector
  selectedScenario: any = "Baseline"
  scenarionList: string[];
  scenarioSelectorDrop(newSortOrder: string){
      this.selectedScenario = newSortOrder;
      //
      this.pullCurrencies();
  }  
  //Currency selector
  selectedCurrency: any = "USD"
  currencyList: string[];
  currencySelectorDrop(newSortOrder: string){
      this.selectedCurrency = newSortOrder;
      //
      this.pullPricingData();
  } 
  
  //User details
  currentUser: UserModel;

  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private authenticationService: AuthService,
    private router: Router
    ) {
      //
      this.leverageChartPlotFlag = false;
      this.tiltsChartPlotFlag = false;
      this.pullBroad();
      //Bubble
      this.bubbleChartPlotFlag = false;
      this.pullBubble();
      
      //
      this.lineChartPriceFutureFlag = false;
      this.lineChartPriceGapFlag = false;
      this.lineChartPriceDecomposeMacroFlag = false;
      this.lineChartPriceDecomposeMacroContFlag = false;
      this.lineChartPriceDecomposeMacroCDFFlag = false;
      this.lineChartGrowthFlag = false;
      //
      this.lineChartWeeklyMacroDecomposition = false;
      this.lineChartmonthlyMacroDecompositionFlag = false;
      this.lineChartquarterlyMacroDecompositionFlag = false;
      //
      this.lineChartWeeklyGrowthDecompositionFlag = false;
      this.lineChartMonthlyGrowthDecompositionFlag = false;
      this.lineChartQuarterlyGrowthDecompositionFlag = false;
      //
      this.returnsTableFlag = false;
      //
//      this.authenticationService.doPing();
//      if (!this.authenticationService.currentUserValue) {
//          //No loging
//      }else{
          //Logged in
      this.currentUser = this.authenticationService.currentUserValue;
      //Load up
      this.http.get<string[]>('https://api.alphahuntsman.com/spectrum/assets').subscribe((data_assets: string[]) => {
        this.assetClassList = new Array<string>();
        for(var t_stop of data_assets[0]['array']){
            this.assetClassList.push(t_stop.replace("_"," "));
        }
        this.assetClassSelected = this.assetClassList[0];
        //
        //Load countries
        this.pullCountries();
      },
      (err) => {
            this.router.navigate(['/pages/maintenance']);
        });
    }
    
    setReturnsFutureData(){
        /*
        this.returnsTableData = new Array<Returns_Details>();
        //Returns_Details
        //2Y
        let t_entry = {
            time_point : "2Y",
            value_mean : Math.round(this.spectrumResultsLatest.returns_expected[0][0] * 1000) / 1000,
            value_lower : Math.round(this.spectrumResultsLatest.returns_expected[0][2] * 1000) / 1000,
            value_upper : Math.round(this.spectrumResultsLatest.returns_expected[0][1] * 1000) / 1000
        }
        this.returnsTableData.push(t_entry);
        //5Y
        t_entry = {
            time_point : "5Y",
            value_mean : Math.round(this.spectrumResultsLatest.returns_expected[1][0] * 1000) / 1000,
            value_lower : Math.round(this.spectrumResultsLatest.returns_expected[1][2] * 1000) / 1000,
            value_upper : Math.round(this.spectrumResultsLatest.returns_expected[1][1] * 1000) / 1000
        }
        this.returnsTableData.push(t_entry);
        //10Y
        t_entry = {
            time_point : "10Y",
            value_mean : Math.round(this.spectrumResultsLatest.returns_expected[2][0] * 1000) / 1000,
            value_lower : Math.round(this.spectrumResultsLatest.returns_expected[2][2] * 1000) / 1000,
            value_upper : Math.round(this.spectrumResultsLatest.returns_expected[2][1] * 1000) / 1000
        }
        this.returnsTableData.push(t_entry);
        //20Y
        t_entry = {
            time_point : "20Y",
            value_mean : Math.round(this.spectrumResultsLatest.returns_expected[3][0] * 1000) / 1000,
            value_lower : Math.round(this.spectrumResultsLatest.returns_expected[3][2] * 1000) / 1000,
            value_upper : Math.round(this.spectrumResultsLatest.returns_expected[3][1] * 1000) / 1000
        }
        this.returnsTableData.push(t_entry);
        this.returnsTableFlag = true;
        */
    }
    
    setPriceFutureData(){
        const lineplot_data_price_mean = [];
        const lineplot_data_price_mean_ub = [];
        const lineplot_data_price_mean_lb = [];
        const lineplot_data_price_fc_ub = [];
        const lineplot_data_price_fc_lb = [];

        const lineplot_data_price_m = [];
        const lineplot_data_price_q = [];
        for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.valuation_future_mean_index.length;t_inner_idx++){
            let temp_unix = new Date(this.spectrumResultsLatest.valuation_future_mean_index[t_inner_idx]);
            let temp_unix_no = temp_unix.getTime();
            //
            let temp_value_w = Number(this.spectrumResultsLatest.valuation_future_mean_values[t_inner_idx]);
            //Push
            lineplot_data_price_mean.push([temp_unix_no, Math.round(temp_value_w * 1000) / 1000])
        }
        //
        for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.valuation_future_mean_ub_index.length;t_inner_idx++){
            let temp_unix = new Date(this.spectrumResultsLatest.valuation_future_mean_ub_index[t_inner_idx]);
            let temp_unix_no = temp_unix.getTime();
            //
            let temp_value_m = Number(this.spectrumResultsLatest.valuation_future_mean_ub_values[t_inner_idx]);
            //Push
            lineplot_data_price_mean_ub.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
        }
        //
        for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.valuation_future_mean_lb_index.length;t_inner_idx++){
            let temp_unix = new Date(this.spectrumResultsLatest.valuation_future_mean_lb_index[t_inner_idx]);
            let temp_unix_no = temp_unix.getTime();
            //
            let temp_value_q = Number(this.spectrumResultsLatest.valuation_future_mean_lb_values[t_inner_idx]);
            //Push
            lineplot_data_price_mean_lb.push([temp_unix_no, Math.round(temp_value_q * 1000) / 1000])
        }
        //
        for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.valuation_future_fc_ub_index.length;t_inner_idx++){
            let temp_unix = new Date(this.spectrumResultsLatest.valuation_future_fc_ub_index[t_inner_idx]);
            let temp_unix_no = temp_unix.getTime();
            //
            let temp_value_m = Number(this.spectrumResultsLatest.valuation_future_fc_ub_values[t_inner_idx]);
            //Push
            lineplot_data_price_fc_ub.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
        }
        //
        for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.valuation_future_fc_lb_index.length;t_inner_idx++){
            let temp_unix = new Date(this.spectrumResultsLatest.valuation_future_fc_lb_index[t_inner_idx]);
            let temp_unix_no = temp_unix.getTime();
            //
            let temp_value_m = Number(this.spectrumResultsLatest.valuation_future_fc_lb_values[t_inner_idx]);
            //Push
            lineplot_data_price_fc_lb.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
        }
        if(lineplot_data_price_mean.length > 0){
            //Price plots
            this.lineChartPriceFuture = new StockChart(this.lineChartPriceFutureOptions);
            //Setting
            this.lineChartPriceFutureOptions.series[0].data = lineplot_data_price_mean;
            this.lineChartPriceFutureOptions.series[1].data = lineplot_data_price_mean_ub;
            this.lineChartPriceFutureOptions.series[2].data = lineplot_data_price_mean_lb;
            this.lineChartPriceFutureOptions.series[3].data = lineplot_data_price_fc_ub;
            this.lineChartPriceFutureOptions.series[4].data = lineplot_data_price_fc_lb;
            //
            this.lineChartPriceFutureOptions.title.text = "Macroeconomics implied returns";
            //
            this.lineChartPriceFutureFlag = true;
        }else{
            this.lineChartPriceFutureFlag = false;
        }
    }
    
    setPriceGapData(){
        const lineplot_data_price_m = [];
        const lineplot_data_price_m3 = [];
        const lineplot_data_price_m12 = [];
        for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.valuation_gap_m_index.length;t_inner_idx++){
            let temp_unix = new Date(this.spectrumResultsLatest.valuation_gap_m_index[t_inner_idx]);
            let temp_unix_no = temp_unix.getTime();
            //
            let temp_value_m = Number(this.spectrumResultsLatest.valuation_gap_m_values[t_inner_idx]);
            //Push
            lineplot_data_price_m.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
        }
        //
        for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.valuation_gap_3m_index.length;t_inner_idx++){
            let temp_unix = new Date(this.spectrumResultsLatest.valuation_gap_3m_index[t_inner_idx]);
            let temp_unix_no = temp_unix.getTime();
            //
            let temp_value_m = Number(this.spectrumResultsLatest.valuation_gap_3m_values[t_inner_idx]);
            //Push
            lineplot_data_price_m3.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
        }
        //
        for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.valuation_gap_12m_index.length;t_inner_idx++){
            let temp_unix = new Date(this.spectrumResultsLatest.valuation_gap_12m_index[t_inner_idx]);
            let temp_unix_no = temp_unix.getTime();
            //
            let temp_value_m = Number(this.spectrumResultsLatest.valuation_gap_12m_values[t_inner_idx]);
            //Push
            lineplot_data_price_m12.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
        }
        if(lineplot_data_price_m.length > 0){
            //Price plots
            this.lineChartPriceGap = new StockChart(this.lineChartPriceGapOptions);
            //Setting
            this.lineChartPriceGapOptions.series[0].data = lineplot_data_price_m;
            this.lineChartPriceGapOptions.series[1].data = lineplot_data_price_m3;
            this.lineChartPriceGapOptions.series[2].data = lineplot_data_price_m12;
            //
            this.lineChartPriceGapOptions.title.text = "Gap between implied and realized returns";
            //
            this.lineChartPriceGapFlag = true;
        }else{
            this.lineChartPriceGapFlag = false;
        }
    }
    
    setPriceDecompositionData(){
        var flagEquity = false;
        
        //Equities
        const lineplot_fundamentals_values_PFE = [];
        const lineplot_fundamentals_values_ROE = [];
        const lineplot_fundamentals_values_FE = [];
        const lineplot_fundamentals_values_B = [];
        const lineplot_fundamentals_values_D = [];
        //Bonds & commodities
        const lineplot_fundamentals_values_Growth_Producer = [];;
        const lineplot_fundamentals_values_Growth_Consumer = [];
        const lineplot_fundamentals_values_Growth_Trade = [];
        const lineplot_fundamentals_values_Inflation_Producer = [];
        const lineplot_fundamentals_values_Inflation_Consumer = [];
        const lineplot_fundamentals_values_Inflation_Trade = [];
        const lineplot_fundamentals_values_Front_Rates = [];
        const lineplot_fundamentals_values_Long_Rates = [];
        const lineplot_fundamentals_values_Implied_Growth = [];
        /*
        for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.fundamentals_index.length;t_inner_idx++){
            let temp_unix = new Date(this.spectrumResultsLatest.fundamentals_index[t_inner_idx]);
            let temp_unix_no = temp_unix.getTime();
            //Equities
            if (this.spectrumResultsLatest.fundamentals_values_PFE){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_PB = Number(this.spectrumResultsLatest.fundamentals_values_PFE[t_inner_idx]);
                lineplot_fundamentals_values_PFE.push([temp_unix_no, Math.round(temp_PB * 1000) / 1000])
            }
            if (this.spectrumResultsLatest.fundamentals_values_ROE){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_PE = Number(this.spectrumResultsLatest.fundamentals_values_ROE[t_inner_idx]);
                lineplot_fundamentals_values_ROE.push([temp_unix_no, Math.round(temp_PE * 1000) / 1000])
            }
            if (this.spectrumResultsLatest.fundamentals_values_FE){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_ERP = Number(this.spectrumResultsLatest.fundamentals_values_FE[t_inner_idx]);
                lineplot_fundamentals_values_FE.push([temp_unix_no, Math.round(temp_ERP * 1000) / 1000])
            }
            if (this.spectrumResultsLatest.fundamentals_values_B){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_Yield = Number(this.spectrumResultsLatest.fundamentals_values_B[t_inner_idx]);
                lineplot_fundamentals_values_B.push([temp_unix_no, Math.round(temp_Yield * 1000) / 1000])
            }
            if (this.spectrumResultsLatest.fundamentals_values_D){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_ROE = Number(this.spectrumResultsLatest.fundamentals_values_D[t_inner_idx]);
                lineplot_fundamentals_values_D.push([temp_unix_no, Math.round(temp_ROE * 1000) / 1000])
            }
            //Bonds & commodities
            if (this.spectrumResultsLatest.fundamentals_values_Growth_Producer){
                if(flagEquity){
                    flagEquity = false
                }
                let temp_FE = Number(this.spectrumResultsLatest.fundamentals_values_Growth_Producer[t_inner_idx]);
                lineplot_fundamentals_values_Growth_Producer.push([temp_unix_no, Math.round(temp_FE * 1000) / 1000])
            }
            if (this.spectrumResultsLatest.fundamentals_values_Growth_Consumer){
                if(flagEquity){
                    flagEquity = false
                }
                let temp_g_DM = Number(this.spectrumResultsLatest.fundamentals_values_Growth_Consumer[t_inner_idx]);
                lineplot_fundamentals_values_Growth_Consumer.push([temp_unix_no, Math.round(temp_g_DM * 1000) / 1000])
            }
            if (this.spectrumResultsLatest.fundamentals_values_Growth_Trade){
                if(flagEquity){
                    flagEquity = false
                }
                let temp_g_EM = Number(this.spectrumResultsLatest.fundamentals_values_Growth_Trade[t_inner_idx]);
                lineplot_fundamentals_values_Growth_Trade.push([temp_unix_no, Math.round(temp_g_EM * 1000) / 1000])
            }
            if (this.spectrumResultsLatest.fundamentals_values_Inflation_Producer){
                if(flagEquity){
                    flagEquity = false
                }
                let temp_g_local = Number(this.spectrumResultsLatest.fundamentals_values_Inflation_Producer[t_inner_idx]);
                lineplot_fundamentals_values_Inflation_Producer.push([temp_unix_no, Math.round(temp_g_local * 1000) / 1000])
            }
            if (this.spectrumResultsLatest.fundamentals_values_Inflation_Consumer){
                if(flagEquity){
                    flagEquity = false
                }
                let temp_rates_short = Number(this.spectrumResultsLatest.fundamentals_values_Inflation_Consumer[t_inner_idx]);
                lineplot_fundamentals_values_Inflation_Consumer.push([temp_unix_no, Math.round(temp_rates_short * 1000) / 1000])
            }
            if (this.spectrumResultsLatest.fundamentals_values_Inflation_Trade){
                if(flagEquity){
                    flagEquity = false
                }
                let temp_inflation_local = Number(this.spectrumResultsLatest.fundamentals_values_Inflation_Trade[t_inner_idx]);
                lineplot_fundamentals_values_Inflation_Trade.push([temp_unix_no, Math.round(temp_inflation_local * 1000) / 1000])
            }
            if (this.spectrumResultsLatest.fundamentals_values_Front_Rates){
                if(flagEquity){
                    flagEquity = false
                }
                let temp_unemployment_local = Number(this.spectrumResultsLatest.fundamentals_values_Front_Rates[t_inner_idx]);
                lineplot_fundamentals_values_Front_Rates.push([temp_unix_no, Math.round(temp_unemployment_local * 1000) / 1000])
            }
            if (this.spectrumResultsLatest.fundamentals_values_Long_Rates){
                if(flagEquity){
                    flagEquity = false
                }
                let temp_unemployment_local = Number(this.spectrumResultsLatest.fundamentals_values_Long_Rates[t_inner_idx]);
                lineplot_fundamentals_values_Long_Rates.push([temp_unix_no, Math.round(temp_unemployment_local * 1000) / 1000])
            }
            if (this.spectrumResultsLatest.fundamentals_values_Implied_Growth){
                if(flagEquity){
                    flagEquity = false
                }
                let temp_unemployment_local = Number(this.spectrumResultsLatest.fundamentals_values_Implied_Growth[t_inner_idx]);
                lineplot_fundamentals_values_Implied_Growth.push([temp_unix_no, Math.round(temp_unemployment_local * 1000) / 1000])
            }

        }
        */
    }

    setMacroWeeklyData(){
        //
        var flagSomething = false;
        const line_Growth_Manufacturing_values = [];
        if (this.spectrumResultsLatest.macro_wedge_Growth_Manufacturing_weekly_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.macro_wedge_Growth_Manufacturing_weekly_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.macro_wedge_Growth_Manufacturing_weekly_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.macro_wedge_Growth_Manufacturing_weekly_values[t_inner_idx]);
                //Push
                line_Growth_Manufacturing_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
                flagSomething = true;
            }
        }
        //
        const line_Growth_Consumer_values = [];
        if (this.spectrumResultsLatest.macro_wedge_Growth_Consumer_weekly_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.macro_wedge_Growth_Consumer_weekly_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.macro_wedge_Growth_Consumer_weekly_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.macro_wedge_Growth_Consumer_weekly_values[t_inner_idx]);
                //Push
                line_Growth_Consumer_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
                flagSomething = true;
            }
        }
        //
        const line_Growth_Trade_values = [];
        if (this.spectrumResultsLatest.macro_wedge_Growth_Trade_weekly_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.macro_wedge_Growth_Trade_weekly_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.macro_wedge_Growth_Trade_weekly_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.macro_wedge_Growth_Trade_weekly_values[t_inner_idx]);
                //Push
                line_Growth_Trade_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
                flagSomething = true;
            }
        }        
        //
        const line_Inflation_Consumer_values = [];
        if (this.spectrumResultsLatest.macro_wedge_Inflation_Consumer_weekly_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.macro_wedge_Inflation_Consumer_weekly_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.macro_wedge_Inflation_Consumer_weekly_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.macro_wedge_Inflation_Consumer_weekly_values[t_inner_idx]);
                //Push
                line_Inflation_Consumer_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
                flagSomething = true;
            }
        }        
        //
        const line_Inflation_Producer_values = [];
        if (this.spectrumResultsLatest.macro_wedge_Inflation_Producer_weekly_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.macro_wedge_Inflation_Producer_weekly_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.macro_wedge_Inflation_Producer_weekly_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.macro_wedge_Inflation_Producer_weekly_values[t_inner_idx]);
                //Push
                line_Inflation_Producer_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
                flagSomething = true;
            }
        }   
        //
        const line_Inflation_Trade_values = [];
        if (this.spectrumResultsLatest.macro_wedge_Inflation_Trade_weekly_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.macro_wedge_Inflation_Trade_weekly_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.macro_wedge_Inflation_Trade_weekly_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.macro_wedge_Inflation_Trade_weekly_values[t_inner_idx]);
                //Push
                line_Inflation_Trade_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
                flagSomething = true;
            }
        }  
        //
        const line_Short_values = [];
        if (this.spectrumResultsLatest.macro_wedge_Short_weekly_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.macro_wedge_Short_weekly_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.macro_wedge_Short_weekly_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.macro_wedge_Short_weekly_values[t_inner_idx]);
                //Push
                line_Short_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
                flagSomething = true;
            }
        }  
        //
        const line_Long_values = [];
        if (this.spectrumResultsLatest.macro_wedge_Long_weekly_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.macro_wedge_Long_weekly_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.macro_wedge_Long_weekly_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.macro_wedge_Long_weekly_values[t_inner_idx]);
                //Push
                line_Long_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
                flagSomething = true;
            }
        }  
        //
        const line_Equities_values = [];
        if (this.spectrumResultsLatest.macro_wedge_Equities_weekly_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.macro_wedge_Equities_weekly_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.macro_wedge_Equities_weekly_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.macro_wedge_Equities_weekly_values[t_inner_idx]);
                //Push
                line_Equities_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
                flagSomething = true;
            }
        }  
        //
        const line_agg_values = [];
        if (this.spectrumResultsLatest.macro_wedge_agg_weekly_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.macro_wedge_agg_weekly_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.macro_wedge_agg_weekly_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.macro_wedge_agg_weekly_values[t_inner_idx]);
                //Push
                line_agg_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
                flagSomething = true;
            }
        }  
        //
        this.lineChartWeeklyMacroDecomposition = new StockChart(this.lineChartWeeklyMacroDecompositionOptions);
        this.lineChartWeeklyMacroDecompositionOptions.series = [];
        //Setting
        if(line_Growth_Manufacturing_values.length > 0){
            var entry : any = {
                name: "Growth Production",
                data: line_Growth_Manufacturing_values
            };
            this.lineChartWeeklyMacroDecompositionOptions.series.push(entry);
            flagSomething = true;
        }
        //
        if(line_Growth_Consumer_values.length > 0){
            var entry : any = {
                name: "Growth Consumer",
                data: line_Growth_Consumer_values
            };
            this.lineChartWeeklyMacroDecompositionOptions.series.push(entry);
            flagSomething = true;
        }
        //
        if(line_Growth_Trade_values.length > 0){
            var entry : any = {
                name: "Growth Trade",
                data: line_Growth_Trade_values
            };
            this.lineChartWeeklyMacroDecompositionOptions.series.push(entry);
            flagSomething = true;
        }
        //
        if(line_Inflation_Consumer_values.length > 0){
            var entry : any = {
                name: "Inflation Consumer",
                data: line_Inflation_Consumer_values
            };
            this.lineChartWeeklyMacroDecompositionOptions.series.push(entry);
            flagSomething = true;
        }        //
        //
        if(line_Inflation_Producer_values.length > 0){
            var entry : any = {
                name: "Inflation Production",
                data: line_Inflation_Producer_values
            };
            this.lineChartWeeklyMacroDecompositionOptions.series.push(entry);
            flagSomething = true;
        }        //
        //
        if(line_Inflation_Trade_values.length > 0){
            var entry : any = {
                name: "Inflation Trade",
                data: line_Inflation_Trade_values
            };
            this.lineChartWeeklyMacroDecompositionOptions.series.push(entry);
            flagSomething = true;
        }        
        //
        if(line_Short_values.length > 0){
            var entry : any = {
                name: "Front Rates",
                data: line_Short_values
            };
            this.lineChartWeeklyMacroDecompositionOptions.series.push(entry);
            flagSomething = true;
        }   
        //
        if(line_Long_values.length > 0){
            var entry : any = {
                name: "Long Rates",
                data: line_Long_values
            };
            this.lineChartWeeklyMacroDecompositionOptions.series.push(entry);
            flagSomething = true;
        }
        //
        if(line_Equities_values.length > 0){
            var entry : any = {
                name: "Market Pricing",
                data: line_Equities_values
            };
            this.lineChartWeeklyMacroDecompositionOptions.series.push(entry);
            flagSomething = true;
        }
        //
        if(line_agg_values.length > 0){
            var entry : any = {
                name: "Aggregate",
                data: line_agg_values
            };
            this.lineChartWeeklyMacroDecompositionOptions.series.push(entry);
            flagSomething = true;
        }
        if (flagSomething){
            //
            this.lineChartWeeklyMacroDecompositionOptions.title.text = "Weekly macroeconomic pricing gap";
            //
            this.lineChartWeeklyMacroDecompositionFlag = true;
        }else{
            this.lineChartWeeklyMacroDecompositionFlag = false;
        }
    }
    
    setMacroMonthlyData(){
        //
        const line_Growth_Manufacturing_values = [];
        var flagSomething = false;
        if (this.spectrumResultsLatest.macro_wedge_Growth_Manufacturing_monthly_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.macro_wedge_Growth_Manufacturing_monthly_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.macro_wedge_Growth_Manufacturing_monthly_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.macro_wedge_Growth_Manufacturing_monthly_values[t_inner_idx]);
                //Push
                line_Growth_Manufacturing_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
                flagSomething = true;
            }
        }
        //
        const line_Growth_Consumer_values = [];
        if (this.spectrumResultsLatest.macro_wedge_Growth_Consumer_monthly_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.macro_wedge_Growth_Consumer_monthly_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.macro_wedge_Growth_Consumer_monthly_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.macro_wedge_Growth_Consumer_monthly_values[t_inner_idx]);
                //Push
                line_Growth_Consumer_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
                flagSomething = true;
            }
        }
        //
        const line_Growth_Trade_values = [];
        if (this.spectrumResultsLatest.macro_wedge_Growth_Trade_monthly_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.macro_wedge_Growth_Trade_monthly_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.macro_wedge_Growth_Trade_monthly_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.macro_wedge_Growth_Trade_monthly_values[t_inner_idx]);
                //Push
                line_Growth_Trade_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
                flagSomething = true;
            }
        }        
        //
        const line_Inflation_Consumer_values = [];
        if (this.spectrumResultsLatest.macro_wedge_Inflation_Consumer_monthly_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.macro_wedge_Inflation_Consumer_monthly_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.macro_wedge_Inflation_Consumer_monthly_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.macro_wedge_Inflation_Consumer_monthly_values[t_inner_idx]);
                //Push
                line_Inflation_Consumer_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
                flagSomething = true;
            }
        }        
        //
        const line_Inflation_Producer_values = [];
        if (this.spectrumResultsLatest.macro_wedge_Inflation_Producer_monthly_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.macro_wedge_Inflation_Producer_monthly_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.macro_wedge_Inflation_Producer_monthly_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.macro_wedge_Inflation_Producer_monthly_values[t_inner_idx]);
                //Push
                line_Inflation_Producer_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
                flagSomething = true;
            }
        }   
        //
        const line_Inflation_Trade_values = [];
        if (this.spectrumResultsLatest.macro_wedge_Inflation_Trade_monthly_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.macro_wedge_Inflation_Trade_monthly_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.macro_wedge_Inflation_Trade_monthly_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.macro_wedge_Inflation_Trade_monthly_values[t_inner_idx]);
                //Push
                line_Inflation_Trade_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
                flagSomething = true;
            }
        }  
        //
        const line_Short_values = [];
        if (this.spectrumResultsLatest.macro_wedge_Short_monthly_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.macro_wedge_Short_monthly_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.macro_wedge_Short_monthly_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.macro_wedge_Short_monthly_values[t_inner_idx]);
                //Push
                line_Short_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
                flagSomething = true;
            }
        }  
        //
        const line_Long_values = [];
        if (this.spectrumResultsLatest.macro_wedge_Long_monthly_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.macro_wedge_Long_monthly_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.macro_wedge_Long_monthly_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.macro_wedge_Long_monthly_values[t_inner_idx]);
                //Push
                line_Long_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
                flagSomething = true;
            }
        }  
        //
        const line_Equities_values = [];
        if (this.spectrumResultsLatest.macro_wedge_Equities_monthly_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.macro_wedge_Equities_monthly_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.macro_wedge_Equities_monthly_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.macro_wedge_Equities_monthly_values[t_inner_idx]);
                //Push
                line_Equities_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
                flagSomething = true;
            }
        }  
        //
        const line_agg_values = [];
        if (this.spectrumResultsLatest.macro_wedge_agg_monthly_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.macro_wedge_agg_monthly_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.macro_wedge_agg_monthly_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.macro_wedge_agg_monthly_values[t_inner_idx]);
                //Push
                line_agg_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
                flagSomething = true;
            }
        }  
        //
        this.lineChartmonthlyMacroDecomposition = new StockChart(this.lineChartmonthlyMacroDecompositionOptions);
        this.lineChartmonthlyMacroDecompositionOptions.series = [];
        //Setting
        if(line_Growth_Manufacturing_values.length > 0){
            var entry : any = {
                name: "Growth Production",
                data: line_Growth_Manufacturing_values
            };
            this.lineChartmonthlyMacroDecompositionOptions.series.push(entry);
            flagSomething = true;
        }
        //
        if(line_Growth_Consumer_values.length > 0){
            var entry : any = {
                name: "Growth Consumer",
                data: line_Growth_Consumer_values
            };
            this.lineChartmonthlyMacroDecompositionOptions.series.push(entry);
            flagSomething = true;
        }
        //
        if(line_Growth_Trade_values.length > 0){
            var entry : any = {
                name: "Growth Trade",
                data: line_Growth_Trade_values
            };
            this.lineChartmonthlyMacroDecompositionOptions.series.push(entry);
            flagSomething = true;
        }
        //
        if(line_Inflation_Consumer_values.length > 0){
            var entry : any = {
                name: "Inflation Consumer",
                data: line_Inflation_Consumer_values
            };
            this.lineChartmonthlyMacroDecompositionOptions.series.push(entry);
            flagSomething = true;
        }        //
        //
        if(line_Inflation_Producer_values.length > 0){
            var entry : any = {
                name: "Inflation Production",
                data: line_Inflation_Producer_values
            };
            this.lineChartmonthlyMacroDecompositionOptions.series.push(entry);
            flagSomething = true;
        }        //
        //
        if(line_Inflation_Trade_values.length > 0){
            var entry : any = {
                name: "Inflation Trade",
                data: line_Inflation_Trade_values
            };
            this.lineChartmonthlyMacroDecompositionOptions.series.push(entry);
            flagSomething = true;
        }        
        //
        if(line_Short_values.length > 0){
            var entry : any = {
                name: "Front Rates",
                data: line_Short_values
            };
            this.lineChartmonthlyMacroDecompositionOptions.series.push(entry);
            flagSomething = true;
        }   
        //
        if(line_Long_values.length > 0){
            var entry : any = {
                name: "Long Rates",
                data: line_Long_values
            };
            this.lineChartmonthlyMacroDecompositionOptions.series.push(entry);
            flagSomething = true;
        }
        //
        if(line_Equities_values.length > 0){
            var entry : any = {
                name: "Market Pricing",
                data: line_Equities_values
            };
            this.lineChartmonthlyMacroDecompositionOptions.series.push(entry);
            flagSomething = true;
        }
        //
        if(line_agg_values.length > 0){
            var entry : any = {
                name: "Aggregate",
                data: line_agg_values
            };
            this.lineChartmonthlyMacroDecompositionOptions.series.push(entry);
            flagSomething = true;
        }
        if (flagSomething){
            //
            this.lineChartmonthlyMacroDecompositionOptions.title.text = "Monthly macroeconomic pricing gap";
            //
            this.lineChartmonthlyMacroDecompositionFlag = true;
        }else{
            this.lineChartmonthlyMacroDecompositionFlag = false;
        }
    }
    
    setMacroQuarterlyData(){
        var flagSomething = false;
        //
        const line_Growth_Manufacturing_values = [];
        if (this.spectrumResultsLatest.macro_wedge_Growth_Manufacturing_quarterly_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.macro_wedge_Growth_Manufacturing_quarterly_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.macro_wedge_Growth_Manufacturing_quarterly_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.macro_wedge_Growth_Manufacturing_quarterly_values[t_inner_idx]);
                //Push
                line_Growth_Manufacturing_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
                flagSomething = true;
            }
        }
        //
        const line_Growth_Consumer_values = [];
        if (this.spectrumResultsLatest.macro_wedge_Growth_Consumer_quarterly_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.macro_wedge_Growth_Consumer_quarterly_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.macro_wedge_Growth_Consumer_quarterly_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.macro_wedge_Growth_Consumer_quarterly_values[t_inner_idx]);
                //Push
                line_Growth_Consumer_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
                flagSomething = true;
            }
        }
        //
        const line_Growth_Trade_values = [];
        if (this.spectrumResultsLatest.macro_wedge_Growth_Trade_quarterly_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.macro_wedge_Growth_Trade_quarterly_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.macro_wedge_Growth_Trade_quarterly_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.macro_wedge_Growth_Trade_quarterly_values[t_inner_idx]);
                //Push
                line_Growth_Trade_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
                flagSomething = true;
            }
        }        
        //
        const line_Inflation_Consumer_values = [];
        if (this.spectrumResultsLatest.macro_wedge_Inflation_Consumer_quarterly_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.macro_wedge_Inflation_Consumer_quarterly_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.macro_wedge_Inflation_Consumer_quarterly_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.macro_wedge_Inflation_Consumer_quarterly_values[t_inner_idx]);
                //Push
                line_Inflation_Consumer_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
                flagSomething = true;
            }
        }        
        //
        const line_Inflation_Producer_values = [];
        if (this.spectrumResultsLatest.macro_wedge_Inflation_Producer_quarterly_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.macro_wedge_Inflation_Producer_quarterly_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.macro_wedge_Inflation_Producer_quarterly_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.macro_wedge_Inflation_Producer_quarterly_values[t_inner_idx]);
                //Push
                line_Inflation_Producer_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
                flagSomething = true;
            }
        }   
        //
        const line_Inflation_Trade_values = [];
        if (this.spectrumResultsLatest.macro_wedge_Inflation_Trade_quarterly_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.macro_wedge_Inflation_Trade_quarterly_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.macro_wedge_Inflation_Trade_quarterly_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.macro_wedge_Inflation_Trade_quarterly_values[t_inner_idx]);
                //Push
                line_Inflation_Trade_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
                flagSomething = true;
            }
        }  
        //
        const line_Short_values = [];
        if (this.spectrumResultsLatest.macro_wedge_Short_quarterly_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.macro_wedge_Short_quarterly_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.macro_wedge_Short_quarterly_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.macro_wedge_Short_quarterly_values[t_inner_idx]);
                //Push
                line_Short_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
                flagSomething = true;
            }
        }  
        //
        const line_Long_values = [];
        if (this.spectrumResultsLatest.macro_wedge_Long_quarterly_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.macro_wedge_Long_quarterly_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.macro_wedge_Long_quarterly_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.macro_wedge_Long_quarterly_values[t_inner_idx]);
                //Push
                line_Long_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
                flagSomething = true;
            }
        }  
        //
        const line_Equities_values = [];
        if (this.spectrumResultsLatest.macro_wedge_Equities_quarterly_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.macro_wedge_Equities_quarterly_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.macro_wedge_Equities_quarterly_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.macro_wedge_Equities_quarterly_values[t_inner_idx]);
                //Push
                line_Equities_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
                flagSomething = true;
            }
        }  
        //
        const line_agg_values = [];
        if (this.spectrumResultsLatest.macro_wedge_agg_quarterly_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.macro_wedge_agg_quarterly_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.macro_wedge_agg_quarterly_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.macro_wedge_agg_quarterly_values[t_inner_idx]);
                //Push
                line_agg_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
                flagSomething = true;
            }
        }  
        //
        this.lineChartquarterlyMacroDecomposition = new StockChart(this.lineChartquarterlyMacroDecompositionOptions);
        this.lineChartquarterlyMacroDecompositionOptions.series = [];
        //Setting
        if(line_Growth_Manufacturing_values.length > 0){
            var entry : any = {
                name: "Growth Production",
                data: line_Growth_Manufacturing_values
            };
            this.lineChartquarterlyMacroDecompositionOptions.series.push(entry);
            flagSomething = true;
        }
        //
        if(line_Growth_Consumer_values.length > 0){
            var entry : any = {
                name: "Growth Consumer",
                data: line_Growth_Consumer_values
            };
            this.lineChartquarterlyMacroDecompositionOptions.series.push(entry);
            flagSomething = true;
        }
        //
        if(line_Growth_Trade_values.length > 0){
            var entry : any = {
                name: "Growth Trade",
                data: line_Growth_Trade_values
            };
            this.lineChartquarterlyMacroDecompositionOptions.series.push(entry);
            flagSomething = true;
        }
        //
        if(line_Inflation_Consumer_values.length > 0){
            var entry : any = {
                name: "Inflation Consumer",
                data: line_Inflation_Consumer_values
            };
            this.lineChartquarterlyMacroDecompositionOptions.series.push(entry);
            flagSomething = true;
        }        //
        //
        if(line_Inflation_Producer_values.length > 0){
            var entry : any = {
                name: "Inflation Production",
                data: line_Inflation_Producer_values
            };
            this.lineChartquarterlyMacroDecompositionOptions.series.push(entry);
            flagSomething = true;
        }        //
        //
        if(line_Inflation_Trade_values.length > 0){
            var entry : any = {
                name: "Inflation Trade",
                data: line_Inflation_Trade_values
            };
            this.lineChartquarterlyMacroDecompositionOptions.series.push(entry);
            flagSomething = true;
        }        
        //
        if(line_Short_values.length > 0){
            var entry : any = {
                name: "Front Rates",
                data: line_Short_values
            };
            this.lineChartquarterlyMacroDecompositionOptions.series.push(entry);
            flagSomething = true;
        }   
        //
        if(line_Long_values.length > 0){
            var entry : any = {
                name: "Long Rates",
                data: line_Long_values
            };
            this.lineChartquarterlyMacroDecompositionOptions.series.push(entry);
            flagSomething = true;
        }
        //
        if(line_Equities_values.length > 0){
            var entry : any = {
                name: "Market Pricing",
                data: line_Equities_values
            };
            this.lineChartquarterlyMacroDecompositionOptions.series.push(entry);
            flagSomething = true;
        }
        //
        if(line_agg_values.length > 0){
            var entry : any = {
                name: "Aggregate",
                data: line_agg_values
            };
            this.lineChartquarterlyMacroDecompositionOptions.series.push(entry);
            flagSomething = true;
        }
        if (flagSomething){
            //
            this.lineChartquarterlyMacroDecompositionOptions.title.text = "Quarterly macroeconomic pricing gap";
            //
            this.lineChartquarterlyMacroDecompositionFlag = true;
        }else{
            this.lineChartquarterlyMacroDecompositionFlag = false;
        }
    }
    
    setGrowthWeeklyDetailsData(){
        //
        var flagSomething = false;
        const line_Growth_Manufacturing_values = [];
        if (this.spectrumResultsLatest.Resid_growth_Growth_Manufacturing_w_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.Resid_growth_Growth_Manufacturing_w_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.Resid_growth_Growth_Manufacturing_w_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.Resid_growth_Growth_Manufacturing_w_values[t_inner_idx]);
                //Push
                line_Growth_Manufacturing_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
            }
            flagSomething = true;
        }
        //
        const line_Growth_Consumer_values = [];
        if (this.spectrumResultsLatest.Resid_growth_Growth_Consumer_w_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.Resid_growth_Growth_Consumer_w_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.Resid_growth_Growth_Consumer_w_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.Resid_growth_Growth_Consumer_w_values[t_inner_idx]);
                //Push
                line_Growth_Consumer_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
            }
            flagSomething = true;
        }
        //
        const line_Growth_Trade_values = [];
        if (this.spectrumResultsLatest.Resid_growth_Growth_Trade_w_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.Resid_growth_Growth_Trade_w_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.Resid_growth_Growth_Trade_w_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.Resid_growth_Growth_Trade_w_values[t_inner_idx]);
                //Push
                line_Growth_Trade_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
            }
            flagSomething = true;
        }
        //
        this.lineChartWeeklyGrowthDecomposition = new StockChart(this.lineChartWeeklyGrowthDecompositionOptions);
        this.lineChartWeeklyGrowthDecompositionOptions.series = [];
        //Setting
        if(line_Growth_Manufacturing_values.length > 0){
            var entry : any = {
                name: "Growth Production",
                data: line_Growth_Manufacturing_values
            };
            this.lineChartWeeklyGrowthDecompositionOptions.series.push(entry);
            flagSomething = true;
        }
        //
        if(line_Growth_Consumer_values.length > 0){
            var entry : any = {
                name: "Growth Consumer",
                data: line_Growth_Consumer_values
            };
            this.lineChartWeeklyGrowthDecompositionOptions.series.push(entry);
            flagSomething = true;
        }
        //
        if(line_Growth_Trade_values.length > 0){
            var entry : any = {
                name: "Growth Trade",
                data: line_Growth_Trade_values
            };
            this.lineChartWeeklyGrowthDecompositionOptions.series.push(entry);
            flagSomething = true;
        }
        if (flagSomething){
            //
            this.lineChartWeeklyGrowthDecompositionOptions.title.text = "Weekly growth pricing gap";
            //
            this.lineChartWeeklyGrowthDecompositionFlag = true;
        }else{
            this.lineChartWeeklyGrowthDecompositionFlag = false;
        }
    }

    setGrowthMonthlyDetailsData(){
        //
        var flagSomething = false;
        const line_Growth_Manufacturing_values = [];
        if (this.spectrumResultsLatest.Resid_growth_Growth_Manufacturing_m_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.Resid_growth_Growth_Manufacturing_m_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.Resid_growth_Growth_Manufacturing_m_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.Resid_growth_Growth_Manufacturing_m_values[t_inner_idx]);
                //Push
                line_Growth_Manufacturing_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
            }
            flagSomething = true;
        }
        //
        const line_Growth_Consumer_values = [];
        if (this.spectrumResultsLatest.Resid_growth_Growth_Consumer_m_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.Resid_growth_Growth_Consumer_m_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.Resid_growth_Growth_Consumer_m_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.Resid_growth_Growth_Consumer_m_values[t_inner_idx]);
                //Push
                line_Growth_Consumer_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
            }
            flagSomething = true;
        }
        //
        const line_Growth_Trade_values = [];
        if (this.spectrumResultsLatest.Resid_growth_Growth_Trade_m_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.Resid_growth_Growth_Trade_m_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.Resid_growth_Growth_Trade_m_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.Resid_growth_Growth_Trade_m_values[t_inner_idx]);
                //Push
                line_Growth_Trade_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
            }
            flagSomething = true;
        }
        //
        this.lineChartMonthlyGrowthDecomposition = new StockChart(this.lineChartMonthlyGrowthDecompositionOptions);
        this.lineChartMonthlyGrowthDecompositionOptions.series = [];
        //Setting
        if(line_Growth_Manufacturing_values.length > 0){
            var entry : any = {
                name: "Growth Production",
                data: line_Growth_Manufacturing_values
            };
            this.lineChartMonthlyGrowthDecompositionOptions.series.push(entry);
            flagSomething = true;
        }
        //
        if(line_Growth_Consumer_values.length > 0){
            var entry : any = {
                name: "Growth Consumer",
                data: line_Growth_Consumer_values
            };
            this.lineChartMonthlyGrowthDecompositionOptions.series.push(entry);
            flagSomething = true;
        }
        //
        if(line_Growth_Trade_values.length > 0){
            var entry : any = {
                name: "Growth Trade",
                data: line_Growth_Trade_values
            };
            this.lineChartMonthlyGrowthDecompositionOptions.series.push(entry);
            flagSomething = true;
        }
        if (flagSomething){
            //
            this.lineChartMonthlyGrowthDecompositionOptions.title.text = "Monthly growth pricing gap";
            //
            this.lineChartMonthlyGrowthDecompositionFlag = true;
        }else{
            this.lineChartMonthlyGrowthDecompositionFlag = false;
        }
    }
    
    setGrowthQuarterlyDetailsData(){
        //
        var flagSomething = false;
        const line_Growth_Manufacturing_values = [];
        if (this.spectrumResultsLatest.Resid_growth_Growth_Manufacturing_3m_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.Resid_growth_Growth_Manufacturing_3m_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.Resid_growth_Growth_Manufacturing_3m_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.Resid_growth_Growth_Manufacturing_3m_values[t_inner_idx]);
                //Push
                line_Growth_Manufacturing_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
            }
            flagSomething = true;
        }
        //
        const line_Growth_Consumer_values = [];
        if (this.spectrumResultsLatest.Resid_growth_Growth_Consumer_3m_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.Resid_growth_Growth_Consumer_3m_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.Resid_growth_Growth_Consumer_3m_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.Resid_growth_Growth_Consumer_3m_values[t_inner_idx]);
                //Push
                line_Growth_Consumer_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
            }
            flagSomething = true;
        }
        //
        const line_Growth_Trade_values = [];
        if (this.spectrumResultsLatest.Resid_growth_Growth_Trade_3m_index){
            //
            for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.Resid_growth_Growth_Trade_3m_index.length;t_inner_idx++){
                let temp_unix = new Date(this.spectrumResultsLatest.Resid_growth_Growth_Trade_3m_index[t_inner_idx]);
                let temp_unix_no = temp_unix.getTime();
                //
                let temp_value_m = Number(this.spectrumResultsLatest.Resid_growth_Growth_Trade_3m_values[t_inner_idx]);
                //Push
                line_Growth_Trade_values.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
            }
            flagSomething = true;
        }
        //
        this.lineChartQuarterlyGrowthDecomposition = new StockChart(this.lineChartQuarterlyGrowthDecompositionOptions);
        this.lineChartQuarterlyGrowthDecompositionOptions.series = [];
        //Setting
        if(line_Growth_Manufacturing_values.length > 0){
            var entry : any = {
                name: "Growth Production",
                data: line_Growth_Manufacturing_values
            };
            this.lineChartQuarterlyGrowthDecompositionOptions.series.push(entry);
            flagSomething = true;
        }
        //
        if(line_Growth_Consumer_values.length > 0){
            var entry : any = {
                name: "Growth Consumer",
                data: line_Growth_Consumer_values
            };
            this.lineChartQuarterlyGrowthDecompositionOptions.series.push(entry);
            flagSomething = true;
        }
        //
        if(line_Growth_Trade_values.length > 0){
            var entry : any = {
                name: "Growth Trade",
                data: line_Growth_Trade_values
            };
            this.lineChartQuarterlyGrowthDecompositionOptions.series.push(entry);
            flagSomething = true;
        }
        if (flagSomething){
            //
            this.lineChartQuarterlyGrowthDecompositionOptions.title.text = "Monthly growth pricing gap";
            //
            this.lineChartQuarterlyGrowthDecompositionFlag = true;
        }else{
            this.lineChartQuarterlyGrowthDecompositionFlag = false;
        }
    }

    setFundamentalPredictions(){
        var flagEquity = false;
        //Equities
        const lineplot_fundamentals_values_PFE = [];
        const lineplot_fundamentals_values_PE = [];
        const lineplot_fundamentals_values_PB = [];
        const lineplot_fundamentals_values_PCE = [];
        const lineplot_fundamentals_values_ROE = [];
        const lineplot_fundamentals_values_Yield = [];
        const lineplot_fundamentals_values_FEPS = [];
        const lineplot_fundamentals_values_TEPS = [];
        const lineplot_fundamentals_values_LREPSgrowth = [];
        const lineplot_fundamentals_values_LREPStrend = [];
        const lineplot_fundamentals_values_SREPSgrowth = [];
        //
        //Setting data
        //
        for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsFundamentalsLatest.fundamentals_index.length;t_inner_idx++){
            let temp_unix = new Date(this.spectrumResultsFundamentalsLatest.fundamentals_index[t_inner_idx]);
            let temp_unix_no = temp_unix.getTime();
            //PFE
            if (this.spectrumResultsFundamentalsLatest.fundamentals_values_PFE.length > 0){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_entry = Number(this.spectrumResultsFundamentalsLatest.fundamentals_values_PFE[t_inner_idx]);
                lineplot_fundamentals_values_PFE.push([temp_unix_no, Math.round(temp_entry * 1000) / 1000])
            }
            //PE
            if (this.spectrumResultsFundamentalsLatest.fundamentals_values_PE.length > 0){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_entry = Number(this.spectrumResultsFundamentalsLatest.fundamentals_values_PE[t_inner_idx]);
                lineplot_fundamentals_values_PE.push([temp_unix_no, Math.round(temp_entry * 1000) / 1000])
            }
            //PB
            if (this.spectrumResultsFundamentalsLatest.fundamentals_values_PB.length > 0){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_entry = Number(this.spectrumResultsFundamentalsLatest.fundamentals_values_PB[t_inner_idx]);
                lineplot_fundamentals_values_PB.push([temp_unix_no, Math.round(temp_entry * 1000) / 1000])
            }    
            //PCE
            if (this.spectrumResultsFundamentalsLatest.fundamentals_values_ROE.length > 0){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_entry = Number(this.spectrumResultsFundamentalsLatest.fundamentals_values_ROE[t_inner_idx]);
                lineplot_fundamentals_values_ROE.push([temp_unix_no, Math.round(temp_entry * 1000) / 1000])
            }    
            //ROE
            if (this.spectrumResultsFundamentalsLatest.fundamentals_values_PCE.length > 0){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_entry = Number(this.spectrumResultsFundamentalsLatest.fundamentals_values_PCE[t_inner_idx]);
                lineplot_fundamentals_values_PCE.push([temp_unix_no, Math.round(temp_entry * 1000) / 1000])
            }              
            //Yield
            if (this.spectrumResultsFundamentalsLatest.fundamentals_values_Yield.length > 0){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_entry = Number(this.spectrumResultsFundamentalsLatest.fundamentals_values_Yield[t_inner_idx]);
                lineplot_fundamentals_values_Yield.push([temp_unix_no, Math.round(temp_entry * 1000) / 1000])
            }
            //FEPS
            if (this.spectrumResultsFundamentalsLatest.fundamentals_values_FEPS.length > 0){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_entry = Number(this.spectrumResultsFundamentalsLatest.fundamentals_values_FEPS[t_inner_idx]);
                lineplot_fundamentals_values_FEPS.push([temp_unix_no, Math.round(temp_entry * 1000) / 1000])
            }
            //TEPS
            if (this.spectrumResultsFundamentalsLatest.fundamentals_values_TEPS.length > 0){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_entry = Number(this.spectrumResultsFundamentalsLatest.fundamentals_values_TEPS[t_inner_idx]);
                lineplot_fundamentals_values_TEPS.push([temp_unix_no, Math.round(temp_entry * 1000) / 1000])
            }  
            //LREPSgrowth
            if (this.spectrumResultsFundamentalsLatest.fundamentals_values_LREPSgrowth.length > 0){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_entry = Number(this.spectrumResultsFundamentalsLatest.fundamentals_values_LREPSgrowth[t_inner_idx]);
                lineplot_fundamentals_values_LREPSgrowth.push([temp_unix_no, Math.round(temp_entry * 1000) / 1000])
            }  
            //LREPStrend
            if (this.spectrumResultsFundamentalsLatest.fundamentals_values_LREPStrend.length > 0){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_entry = Number(this.spectrumResultsFundamentalsLatest.fundamentals_values_LREPStrend[t_inner_idx]);
                lineplot_fundamentals_values_LREPStrend.push([temp_unix_no, Math.round(temp_entry * 1000) / 1000])
            }  
            //SREPSgrowth
            if (this.spectrumResultsFundamentalsLatest.fundamentals_values_SREPSgrowth.length > 0){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_entry = Number(this.spectrumResultsFundamentalsLatest.fundamentals_values_SREPSgrowth[t_inner_idx]);
                lineplot_fundamentals_values_SREPSgrowth.push([temp_unix_no, Math.round(temp_entry * 1000) / 1000])
            }  
        }
        if(flagEquity){
            this.lineChartPriceDecomposeMacro = new StockChart(this.lineChartPriceDecomposeMacroOptions);
            this.lineChartPriceDecomposeMacroOptions.series = [];
            if(lineplot_fundamentals_values_PFE.length > 0){
                var entry : any = {
                    name: "PFE",
                    data: lineplot_fundamentals_values_PFE
                };
                this.lineChartPriceDecomposeMacroOptions.series.push(entry);
            }
            if(lineplot_fundamentals_values_PE.length > 0){
                var entry : any = {
                    name: "PE",
                    data: lineplot_fundamentals_values_PE
                };
                this.lineChartPriceDecomposeMacroOptions.series.push(entry);
            }
            if(lineplot_fundamentals_values_PB.length > 0){
                var entry : any = {
                    name: "PB",
                    data: lineplot_fundamentals_values_PB
                };
                this.lineChartPriceDecomposeMacroOptions.series.push(entry);
            }
            if(lineplot_fundamentals_values_PCE.length > 0){
                var entry : any = {
                    name: "PCE",
                    data: lineplot_fundamentals_values_PCE
                };
                this.lineChartPriceDecomposeMacroOptions.series.push(entry);
            }
            if(lineplot_fundamentals_values_ROE.length > 0){
                var entry : any = {
                    name: "ROE",
                    data: lineplot_fundamentals_values_ROE
                };
                this.lineChartPriceDecomposeMacroOptions.series.push(entry);
            }
            if(lineplot_fundamentals_values_Yield.length > 0){
                var entry : any = {
                    name: "Dividend yield",
                    data: lineplot_fundamentals_values_Yield
                };
                this.lineChartPriceDecomposeMacroOptions.series.push(entry);
            }
            if(lineplot_fundamentals_values_FEPS.length > 0){
                var entry : any = {
                    name: "Forward EPS",
                    data: lineplot_fundamentals_values_FEPS
                };
                this.lineChartPriceDecomposeMacroOptions.series.push(entry);
            }            
            if(lineplot_fundamentals_values_TEPS.length > 0){
                var entry : any = {
                    name: "Trend EPS",
                    data: lineplot_fundamentals_values_TEPS
                };
                this.lineChartPriceDecomposeMacroOptions.series.push(entry);
            }             
            if(lineplot_fundamentals_values_LREPSgrowth.length > 0){
                var entry : any = {
                    name: "Long-run EPS growth",
                    data: lineplot_fundamentals_values_LREPSgrowth
                };
                this.lineChartPriceDecomposeMacroOptions.series.push(entry);
            }             
            if(lineplot_fundamentals_values_LREPStrend.length > 0){
                var entry : any = {
                    name: "Long-run EPS trend",
                    data: lineplot_fundamentals_values_LREPStrend
                };
                this.lineChartPriceDecomposeMacroOptions.series.push(entry);
            }             
            if(lineplot_fundamentals_values_SREPSgrowth.length > 0){
                var entry : any = {
                    name: "Short-run EPS trend",
                    data: lineplot_fundamentals_values_SREPSgrowth
                };
                this.lineChartPriceDecomposeMacroOptions.series.push(entry);
            }
            //
            this.lineChartPriceDecomposeMacroOptions.title.text = "Macroeconomics implied fundamentals";
            //
            this.lineChartPriceDecomposeMacroFlag = true;
        }else{
            this.lineChartPriceDecomposeMacroFlag = false;
        }
        
        //Plot
        //this.lineChartPriceDecomposeMacroCont = new StockChart(this.lineChartPriceDecomposeMacroContOptions);
        //this.lineChartPriceDecomposeMacroContOptions.series = [];

    }
    
    setFundamentalPredictionsCDF(){
        var flagEquity = false
        //Equities
        const lineplot_fundamentals_cdf_PFE = [];
        const lineplot_fundamentals_cdf_PE = [];
        const lineplot_fundamentals_cdf_PB = [];
        const lineplot_fundamentals_cdf_PCE = [];
        const lineplot_fundamentals_cdf_ROE = [];
        const lineplot_fundamentals_cdf_Yield = [];
        const lineplot_fundamentals_cdf_FEPS = [];
        const lineplot_fundamentals_cdf_TEPS = [];
        const lineplot_fundamentals_cdf_LREPSgrowth = [];
        const lineplot_fundamentals_cdf_LREPStrend = [];
        const lineplot_fundamentals_cdf_SREPSgrowth = [];
        //
        //Setting data
        //
        for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsFundamentalsLatest.fundamentals_cdf_index.length;t_inner_idx++){
            let temp_unix = new Date(this.spectrumResultsFundamentalsLatest.fundamentals_cdf_index[t_inner_idx]);
            let temp_unix_no = temp_unix.getTime();
            //PFE
            if (this.spectrumResultsFundamentalsLatest.fundamentals_cdf_PFE.length > 0){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_entry = Number(this.spectrumResultsFundamentalsLatest.fundamentals_cdf_PFE[t_inner_idx]);
                lineplot_fundamentals_cdf_PFE.push([temp_unix_no, Math.round(temp_entry * 1000) / 1000])
            }
            //PE
            if (this.spectrumResultsFundamentalsLatest.fundamentals_cdf_PE.length > 0){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_entry = Number(this.spectrumResultsFundamentalsLatest.fundamentals_cdf_PE[t_inner_idx]);
                lineplot_fundamentals_cdf_PE.push([temp_unix_no, Math.round(temp_entry * 1000) / 1000])
            }
            //PB
            if (this.spectrumResultsFundamentalsLatest.fundamentals_cdf_PB.length > 0){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_entry = Number(this.spectrumResultsFundamentalsLatest.fundamentals_cdf_PB[t_inner_idx]);
                lineplot_fundamentals_cdf_PB.push([temp_unix_no, Math.round(temp_entry * 1000) / 1000])
            }    
            //PCE
            if (this.spectrumResultsFundamentalsLatest.fundamentals_cdf_ROE.length > 0){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_entry = Number(this.spectrumResultsFundamentalsLatest.fundamentals_cdf_ROE[t_inner_idx]);
                lineplot_fundamentals_cdf_ROE.push([temp_unix_no, Math.round(temp_entry * 1000) / 1000])
            }    
            //ROE
            if (this.spectrumResultsFundamentalsLatest.fundamentals_cdf_PCE.length > 0){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_entry = Number(this.spectrumResultsFundamentalsLatest.fundamentals_cdf_PCE[t_inner_idx]);
                lineplot_fundamentals_cdf_PCE.push([temp_unix_no, Math.round(temp_entry * 1000) / 1000])
            }              
            //Yield
            if (this.spectrumResultsFundamentalsLatest.fundamentals_cdf_Yield.length > 0){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_entry = Number(this.spectrumResultsFundamentalsLatest.fundamentals_cdf_Yield[t_inner_idx]);
                lineplot_fundamentals_cdf_Yield.push([temp_unix_no, Math.round(temp_entry * 1000) / 1000])
            }
            //FEPS
            if (this.spectrumResultsFundamentalsLatest.fundamentals_cdf_FEPS.length > 0){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_entry = Number(this.spectrumResultsFundamentalsLatest.fundamentals_cdf_FEPS[t_inner_idx]);
                lineplot_fundamentals_cdf_FEPS.push([temp_unix_no, Math.round(temp_entry * 1000) / 1000])
            }
            //TEPS
            if (this.spectrumResultsFundamentalsLatest.fundamentals_cdf_TEPS.length > 0){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_entry = Number(this.spectrumResultsFundamentalsLatest.fundamentals_cdf_TEPS[t_inner_idx]);
                lineplot_fundamentals_cdf_TEPS.push([temp_unix_no, Math.round(temp_entry * 1000) / 1000])
            }  
            //LREPSgrowth
            if (this.spectrumResultsFundamentalsLatest.fundamentals_cdf_LREPSgrowth.length > 0){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_entry = Number(this.spectrumResultsFundamentalsLatest.fundamentals_cdf_LREPSgrowth[t_inner_idx]);
                lineplot_fundamentals_cdf_LREPSgrowth.push([temp_unix_no, Math.round(temp_entry * 1000) / 1000])
            }  
            //LREPStrend
            if (this.spectrumResultsFundamentalsLatest.fundamentals_cdf_LREPStrend.length > 0){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_entry = Number(this.spectrumResultsFundamentalsLatest.fundamentals_cdf_LREPStrend[t_inner_idx]);
                lineplot_fundamentals_cdf_LREPStrend.push([temp_unix_no, Math.round(temp_entry * 1000) / 1000])
            }  
            //SREPSgrowth
            if (this.spectrumResultsFundamentalsLatest.fundamentals_cdf_SREPSgrowth.length > 0){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_entry = Number(this.spectrumResultsFundamentalsLatest.fundamentals_cdf_SREPSgrowth[t_inner_idx]);
                lineplot_fundamentals_cdf_SREPSgrowth.push([temp_unix_no, Math.round(temp_entry * 1000) / 1000])
            }  
        }
        if(flagEquity){
            this.lineChartPriceDecomposeMacroCDFOptions.series = [];
            if(lineplot_fundamentals_cdf_PFE.length > 0){
                var entry : any = {
                    name: "PFE",
                    data: lineplot_fundamentals_cdf_PFE
                };
                this.lineChartPriceDecomposeMacroCDFOptions.series.push(entry);
            }
            if(lineplot_fundamentals_cdf_PE.length > 0){
                var entry : any = {
                    name: "PE",
                    data: lineplot_fundamentals_cdf_PE
                };
                this.lineChartPriceDecomposeMacroCDFOptions.series.push(entry);
            }
            if(lineplot_fundamentals_cdf_PB.length > 0){
                var entry : any = {
                    name: "PB",
                    data: lineplot_fundamentals_cdf_PB
                };
                this.lineChartPriceDecomposeMacroCDFOptions.series.push(entry);
            }
            if(lineplot_fundamentals_cdf_PCE.length > 0){
                var entry : any = {
                    name: "PCE",
                    data: lineplot_fundamentals_cdf_PCE
                };
                this.lineChartPriceDecomposeMacroCDFOptions.series.push(entry);
            }
            if(lineplot_fundamentals_cdf_ROE.length > 0){
                var entry : any = {
                    name: "ROE",
                    data: lineplot_fundamentals_cdf_ROE
                };
                this.lineChartPriceDecomposeMacroCDFOptions.series.push(entry);
            }
            if(lineplot_fundamentals_cdf_Yield.length > 0){
                var entry : any = {
                    name: "Dividend yield",
                    data: lineplot_fundamentals_cdf_Yield
                };
                this.lineChartPriceDecomposeMacroCDFOptions.series.push(entry);
            }
            if(lineplot_fundamentals_cdf_FEPS.length > 0){
                var entry : any = {
                    name: "Forward EPS",
                    data: lineplot_fundamentals_cdf_FEPS
                };
                this.lineChartPriceDecomposeMacroCDFOptions.series.push(entry);
            }            
            if(lineplot_fundamentals_cdf_TEPS.length > 0){
                var entry : any = {
                    name: "Trend EPS",
                    data: lineplot_fundamentals_cdf_TEPS
                };
                this.lineChartPriceDecomposeMacroCDFOptions.series.push(entry);
            }             
            if(lineplot_fundamentals_cdf_LREPSgrowth.length > 0){
                var entry : any = {
                    name: "Long-run EPS growth",
                    data: lineplot_fundamentals_cdf_LREPSgrowth
                };
                this.lineChartPriceDecomposeMacroCDFOptions.series.push(entry);
            }             
            if(lineplot_fundamentals_cdf_LREPStrend.length > 0){
                var entry : any = {
                    name: "Long-run EPS trend",
                    data: lineplot_fundamentals_cdf_LREPStrend
                };
                this.lineChartPriceDecomposeMacroCDFOptions.series.push(entry);
            }             
            if(lineplot_fundamentals_cdf_SREPSgrowth.length > 0){
                var entry : any = {
                    name: "Short-run EPS trend",
                    data: lineplot_fundamentals_cdf_SREPSgrowth
                };
                this.lineChartPriceDecomposeMacroCDFOptions.series.push(entry);
            }
            //
            this.lineChartPriceDecomposeMacroCDFOptions.title.text = "Fundamental contributions to returns";
            this.lineChartPriceDecomposeMacroCDF = new StockChart(this.lineChartPriceDecomposeMacroCDFOptions);
            this.lineChartPriceDecomposeMacroCDFFlag = true;
        }else{
            this.lineChartPriceDecomposeMacroCDFFlag = false;
        }
    }
    
    setFundamentalPredictionsCont(){
        var flagEquity = false;
        //Equities
        const lineplot_fundamentals_cont_PFE = [];
        const lineplot_fundamentals_cont_PE = [];
        const lineplot_fundamentals_cont_PB = [];
        const lineplot_fundamentals_cont_PCE = [];
        const lineplot_fundamentals_cont_ROE = [];
        const lineplot_fundamentals_cont_Yield = [];
        const lineplot_fundamentals_cont_FEPS = [];
        const lineplot_fundamentals_cont_TEPS = [];
        const lineplot_fundamentals_cont_LREPSgrowth = [];
        const lineplot_fundamentals_cont_LREPStrend = [];
        const lineplot_fundamentals_cont_SREPSgrowth = [];
        //
        //Setting data
        //
        for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsFundamentalsLatest.fundamentals_cont_index.length;t_inner_idx++){
            let temp_unix = new Date(this.spectrumResultsFundamentalsLatest.fundamentals_cont_index[t_inner_idx]);
            let temp_unix_no = temp_unix.getTime();
            //PFE
            if (this.spectrumResultsFundamentalsLatest.fundamentals_cont_PFE.length > 0){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_entry = Number(this.spectrumResultsFundamentalsLatest.fundamentals_cont_PFE[t_inner_idx]);
                lineplot_fundamentals_cont_PFE.push([temp_unix_no, Math.round(temp_entry * 1000) / 1000])
            }
            //PE
            if (this.spectrumResultsFundamentalsLatest.fundamentals_cont_PE.length > 0){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_entry = Number(this.spectrumResultsFundamentalsLatest.fundamentals_cont_PE[t_inner_idx]);
                lineplot_fundamentals_cont_PE.push([temp_unix_no, Math.round(temp_entry * 1000) / 1000])
            }
            //PB
            if (this.spectrumResultsFundamentalsLatest.fundamentals_cont_PB.length > 0){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_entry = Number(this.spectrumResultsFundamentalsLatest.fundamentals_cont_PB[t_inner_idx]);
                lineplot_fundamentals_cont_PB.push([temp_unix_no, Math.round(temp_entry * 1000) / 1000])
            }    
            //PCE
            if (this.spectrumResultsFundamentalsLatest.fundamentals_cont_PCE.length > 0){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_entry = Number(this.spectrumResultsFundamentalsLatest.fundamentals_cont_PCE[t_inner_idx]);
                lineplot_fundamentals_cont_PCE.push([temp_unix_no, Math.round(temp_entry * 1000) / 1000])
            }    
            //ROE
            if (this.spectrumResultsFundamentalsLatest.fundamentals_cont_ROE.length > 0){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_entry = Number(this.spectrumResultsFundamentalsLatest.fundamentals_cont_ROE[t_inner_idx]);
                lineplot_fundamentals_cont_ROE.push([temp_unix_no, Math.round(temp_entry * 1000) / 1000])
            }              
            //Yield
            if (this.spectrumResultsFundamentalsLatest.fundamentals_cont_Yield.length > 0){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_entry = Number(this.spectrumResultsFundamentalsLatest.fundamentals_cont_Yield[t_inner_idx]);
                lineplot_fundamentals_cont_Yield.push([temp_unix_no, Math.round(temp_entry * 1000) / 1000])
            }
            //FEPS
            if (this.spectrumResultsFundamentalsLatest.fundamentals_cont_FEPS.length > 0){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_entry = Number(this.spectrumResultsFundamentalsLatest.fundamentals_cont_FEPS[t_inner_idx]);
                lineplot_fundamentals_cont_FEPS.push([temp_unix_no, Math.round(temp_entry * 1000) / 1000])
            }
            //TEPS
            if (this.spectrumResultsFundamentalsLatest.fundamentals_cont_TEPS.length > 0){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_entry = Number(this.spectrumResultsFundamentalsLatest.fundamentals_cont_TEPS[t_inner_idx]);
                lineplot_fundamentals_cont_TEPS.push([temp_unix_no, Math.round(temp_entry * 1000) / 1000])
            }  
            //LREPSgrowth
            if (this.spectrumResultsFundamentalsLatest.fundamentals_cont_LREPSgrowth.length > 0){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_entry = Number(this.spectrumResultsFundamentalsLatest.fundamentals_cont_LREPSgrowth[t_inner_idx]);
                lineplot_fundamentals_cont_LREPSgrowth.push([temp_unix_no, Math.round(temp_entry * 1000) / 1000])
            }  
            //LREPStrend
            if (this.spectrumResultsFundamentalsLatest.fundamentals_cont_LREPStrend.length > 0){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_entry = Number(this.spectrumResultsFundamentalsLatest.fundamentals_cont_LREPStrend[t_inner_idx]);
                lineplot_fundamentals_cont_LREPStrend.push([temp_unix_no, Math.round(temp_entry * 1000) / 1000])
            }  
            //SREPSgrowth
            if (this.spectrumResultsFundamentalsLatest.fundamentals_cont_SREPSgrowth.length > 0){
                if(!flagEquity){
                    flagEquity = true
                }
                let temp_entry = Number(this.spectrumResultsFundamentalsLatest.fundamentals_cont_SREPSgrowth[t_inner_idx]);
                lineplot_fundamentals_cont_SREPSgrowth.push([temp_unix_no, Math.round(temp_entry * 1000) / 1000])
            }  
        }
        //
        if(flagEquity){
            //Price plots
            this.lineChartPriceDecomposeMacroContOptions.series = [];
            //Setting
            if(lineplot_fundamentals_cont_PFE.length > 0){
                var entry : any = {
                    name: "PFE",
                    data: lineplot_fundamentals_cont_PFE
                };
                this.lineChartPriceDecomposeMacroContOptions.series.push(entry);
            }
            if(lineplot_fundamentals_cont_PE.length > 0){
                var entry : any = {
                    name: "PE",
                    data: lineplot_fundamentals_cont_PE
                };
                this.lineChartPriceDecomposeMacroContOptions.series.push(entry);
            }
            if(lineplot_fundamentals_cont_PB.length > 0){
                var entry : any = {
                    name: "PB",
                    data: lineplot_fundamentals_cont_PB
                };
                this.lineChartPriceDecomposeMacroContOptions.series.push(entry);
            } 
            if(lineplot_fundamentals_cont_PCE.length > 0){
                var entry : any = {
                    name: "PCE",
                    data: lineplot_fundamentals_cont_PCE
                };
                this.lineChartPriceDecomposeMacroContOptions.series.push(entry);
            } 
            if(lineplot_fundamentals_cont_ROE.length > 0){
                var entry : any = {
                    name: "ROE",
                    data: lineplot_fundamentals_cont_ROE
                };
                this.lineChartPriceDecomposeMacroContOptions.series.push(entry);
            } 
            if(lineplot_fundamentals_cont_Yield.length > 0){
                var entry : any = {
                    name: "Dividend yield",
                    data: lineplot_fundamentals_cont_Yield
                };
                this.lineChartPriceDecomposeMacroContOptions.series.push(entry);
            } 
            if(lineplot_fundamentals_cont_FEPS.length > 0){
                var entry : any = {
                    name: "Forward EPS",
                    data: lineplot_fundamentals_cont_FEPS
                };
                this.lineChartPriceDecomposeMacroContOptions.series.push(entry);
            } 
            if(lineplot_fundamentals_cont_TEPS.length > 0){
                var entry : any = {
                    name: "Trend EPS",
                    data: lineplot_fundamentals_cont_TEPS
                };
                this.lineChartPriceDecomposeMacroContOptions.series.push(entry);
            } 
            if(lineplot_fundamentals_cont_LREPSgrowth.length > 0){
                var entry : any = {
                    name: "Long-run EPS growth",
                    data: lineplot_fundamentals_cont_LREPSgrowth
                };
                this.lineChartPriceDecomposeMacroContOptions.series.push(entry);
            } 
            if(lineplot_fundamentals_cont_LREPStrend.length > 0){
                var entry : any = {
                    name: "Long-run EPS trend",
                    data: lineplot_fundamentals_cont_LREPStrend
                };
                this.lineChartPriceDecomposeMacroContOptions.series.push(entry);
            }  
            if(lineplot_fundamentals_cont_SREPSgrowth.length > 0){
                var entry : any = {
                    name: "Short-run EPS growth",
                    data: lineplot_fundamentals_cont_SREPSgrowth
                };
                this.lineChartPriceDecomposeMacroContOptions.series.push(entry);
            }
            this.lineChartPriceDecomposeMacroContOptions.title.text = "Fundamental contributions to returns";
            this.lineChartPriceDecomposeMacroCont = new StockChart(this.lineChartPriceDecomposeMacroContOptions);
            this.lineChartPriceDecomposeMacroContFlag = true;
        }else{
            this.lineChartPriceDecomposeMacroContFlag = false;
        }
    }

    setGrowthData(){
        const lineplot_data_price_gap_w = [];
        for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.growth_weekly_index.length;t_inner_idx++){
            let temp_unix = new Date(this.spectrumResultsLatest.growth_weekly_index[t_inner_idx]);
            let temp_unix_no = temp_unix.getTime();
            //
            let temp_value_m = -1.0*Number(this.spectrumResultsLatest.growth_weekly_values[t_inner_idx]);
            //Push
            lineplot_data_price_gap_w.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
        }
        //
        const lineplot_data_price_gap_m = [];
        for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.growth_monthly_index.length;t_inner_idx++){
            let temp_unix = new Date(this.spectrumResultsLatest.growth_monthly_index[t_inner_idx]);
            let temp_unix_no = temp_unix.getTime();
            //
            let temp_value_m = -1.0*Number(this.spectrumResultsLatest.growth_monthly_values[t_inner_idx]);
            //Push
            lineplot_data_price_gap_m.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
        }
        //
        const lineplot_data_price_gap_m3 = [];
        for(var t_inner_idx = 0; t_inner_idx < this.spectrumResultsLatest.growth_3months_index.length;t_inner_idx++){
            let temp_unix = new Date(this.spectrumResultsLatest.growth_3months_index[t_inner_idx]);
            let temp_unix_no = temp_unix.getTime();
            //
            let temp_value_m = -1.0*Number(this.spectrumResultsLatest.growth_3months_values[t_inner_idx]);
            //Push
            lineplot_data_price_gap_m3.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
        }
        if (lineplot_data_price_gap_w.length > 0){
            //Price plots
            this.lineChartGrowth = new StockChart(this.lineChartGrowthOptions);
            //Setting
            this.lineChartGrowthOptions.series[0].data = lineplot_data_price_gap_w;
            this.lineChartGrowthOptions.series[1].data = lineplot_data_price_gap_m;
            this.lineChartGrowthOptions.series[2].data = lineplot_data_price_gap_m3;
            //
            this.lineChartGrowthOptions.title.text = "Market priced vs nowcasted growth";
            //
            this.lineChartGrowthFlag = true;
        }else{
            this.lineChartGrowthFlag = false;
        }
    }    

    pullPricingData(){
        //
        this.lineChartPriceFutureFlag = false;
        this.lineChartPriceGapFlag = false;
        this.lineChartPriceDecomposeMacroFlag = false;
        this.lineChartPriceDecomposeMacroContFlag = false;
        this.lineChartGrowthFlag = false;
        //
        this.lineChartWeeklyMacroDecompositionFlag = false;
        this.lineChartmonthlyMacroDecompositionFlag = false;
        this.lineChartquarterlyMacroDecompositionFlag = false;
        //
        this.lineChartWeeklyGrowthDecompositionFlag = false;
        this.lineChartMonthlyGrowthDecompositionFlag = false;
        this.lineChartQuarterlyGrowthDecompositionFlag = false;
        //
        //
        this.lineChartPriceFuture = null;
        this.lineChartPriceGap = null;
        this.lineChartPriceDecomposeMacro = null;
        this.lineChartPriceDecomposeMacroCont = null;
        this.lineChartGrowth = null;
        
        this.http.get<SpectrumResults>('https://api.alphahuntsman.com/spectrum/results?country=' + this.countrySelected 
            + '&sector=' + this.selectedSector 
            + '&assets=' + this.assetClassSelected 
            + '&scenario=' + this.selectedScenario 
            + '&currency=' + this.selectedCurrency 
//            + '&ID=' + this.currentUser.tempAPI
            ).subscribe((data_results: SpectrumResults) => {
            //
            //
            this.refreshDate = data_results.last_update 
            this.refreshDate_next = data_results.next_update;
            this.spectrumResultsLatest = data_results;
            //Plot future returns
            this.setPriceFutureData();
            //Plot gap returns
            this.setPriceGapData();
            //Fundamentals decomposition
            this.setPriceDecompositionData();
            //Growth aggregate
            this.setGrowthData();
            //
            this.setMacroWeeklyData();
            this.setMacroMonthlyData();
            this.setMacroQuarterlyData();
            //Growth components
            this.setGrowthWeeklyDetailsData();
            this.setGrowthMonthlyDetailsData();
            this.setGrowthQuarterlyDetailsData();
      });
      
      this.http.get<SpectrumResultsFundamentals>('https://api.alphahuntsman.com/spectrum/results_detailed?country=' + this.countrySelected 
            + '&sector=' + this.selectedSector 
            + '&assets=' + this.assetClassSelected 
            + '&scenario=' + this.selectedScenario 
            + '&currency=' + this.selectedCurrency 
//            + '&ID=' + this.currentUser.tempAPI
            ).subscribe((data_results: SpectrumResultsFundamentals) => {
            //
            //
            this.spectrumResultsFundamentalsLatest = data_results;
            //Fundamentals predictions
            this.setFundamentalPredictions();
            //Fundamentals contributions
            this.setFundamentalPredictionsCont();
            //Fundamentals cdf
            this.setFundamentalPredictionsCDF();
      });
    }
  
    pullScenarios(){
        //Load scenarions
        this.http.get<string[]>('https://api.alphahuntsman.com/spectrum/scenarios?country=' + this.countrySelected 
            + '&sector=' + this.selectedSector 
            + '&assets=' + this.assetClassSelected
            ).subscribe((data_scenarios: string[]) => {
            this.scenarionList = new Array<string>();
            for(var t_stop of data_scenarios){
                this.scenarionList.push(t_stop);
            }
            this.scenarionList = this.scenarionList.sort();
            this.selectedScenario = this.scenarionList[0];
            //Currencies
            this.pullCurrencies();
        });
    }    

    pullCurrencies(){
        //Load currencies
        this.http.get<string[]>('https://api.alphahuntsman.com/spectrum/currencies?country=' + this.countrySelected 
            + '&sector=' + this.selectedSector 
            + '&assets=' + this.assetClassSelected
            + '&scenario=' + this.selectedScenario
            ).subscribe((data_currency: string[]) => {
            this.currencyList = new Array<string>();
            for(var t_stop of data_currency){
                this.currencyList.push(t_stop);
            }
            this.currencyList = this.currencyList.sort();
            this.selectedCurrency = this.currencyList[0];
            //Currencies
            this.pullPricingData();
        });
    }  

    pullCountries(){
        //Load countriesx
        this.http.get<string[]>('https://api.alphahuntsman.com/spectrum/countries?assets=' + this.assetClassSelected
            ).subscribe((data_countries: string[]) => {
            this.countryList = new Array<string>();
            for(var t_stop of data_countries[0]['array']){
                this.countryList.push(t_stop.replace("_"," "));
            }
            this.countrySelected = this.countryList[0];
            //
            //Load sectors
            this.pullSectors();
        });
    }
  
    pullSectors(){
        //Load scenarions
        this.http.get<string[]>('https://api.alphahuntsman.com/spectrum/sectors?country=' + this.countrySelected 
            + '&assets=' + this.assetClassSelected
            ).subscribe((data_sectors: string[]) => {
            this.sectorList = new Array<string>();
            for(var t_stop of data_sectors){
                this.sectorList.push(t_stop);
            }
            this.sectorList = this.sectorList.sort();
            this.selectedSector = this.sectorList[0];
            //Load Scenarios
            this.pullScenarios();
        });
    }

    pullBroad(){
      //
      this.http.get<SpectrumResultsBroad>('https://api.alphahuntsman.com/spectrum/broadTilts?category=Broad')
      .subscribe((data_results: SpectrumResultsBroad) => {
          this.leverageChartPlotOptions.xAxis.categories = data_results.lev_index;
          this.leverageChartPlotOptions.series[0].data = data_results.lev_values;
          //
          this.tiltsChartPlotOptions.xAxis.categories = data_results.tilt_index;
          this.tiltsChartPlotOptions.series[0].data = data_results.til_values;
          //
          this.leverageChartPlot = new Chart(this.leverageChartPlotOptions);
          this.tiltsChartPlot = new Chart(this.tiltsChartPlotOptions);
          this.leverageChartPlotFlag = true;
          this.tiltsChartPlotFlag = true;
      });
    }
    
    pullBubble(){
      this.http.get<SpectrumResultsTAAIn>('https://api.alphahuntsman.com/spectrum/taa_inside?category=Broad')
      .subscribe((data_results: SpectrumResultsTAAIn) => {
          //US Equities
          this.bubbleChartPlotOptions.series[0].data = [];
          for(var t_i = 0; t_i < data_results.US_Equities_index.length; t_i++){
            var t_entry = {
                name    :   data_results.US_Equities_index[t_i],
                value   :   data_results.US_Equities_values[t_i]*100
            }
            this.bubbleChartPlotOptions.series[0].data.push(t_entry);
          }
          //EA Equities
          this.bubbleChartPlotOptions.series[1].data = [];
          for(var t_i = 0; t_i < data_results.EA_Equities_index.length; t_i++){
            var t_entry = {
                name    :   data_results.EA_Equities_index[t_i],
                value   :   data_results.EA_Equities_values[t_i]*100
            }
            this.bubbleChartPlotOptions.series[1].data.push(t_entry);
          }
          //Japan Equities
          this.bubbleChartPlotOptions.series[2].data = [];
          for(var t_i = 0; t_i < data_results.Japan_Equities_index.length; t_i++){
            var t_entry = {
                name    :   data_results.Japan_Equities_index[t_i],
                value   :   data_results.Japan_Equities_values[t_i]*100
            }
            this.bubbleChartPlotOptions.series[2].data.push(t_entry);
          }
          //China Equities
          this.bubbleChartPlotOptions.series[3].data = [];
          for(var t_i = 0; t_i < data_results.China_Equities_index.length; t_i++){
            var t_entry = {
                name    :   data_results.China_Equities_index[t_i],
                value   :   data_results.China_Equities_values[t_i]*100
            }
            this.bubbleChartPlotOptions.series[3].data.push(t_entry);
          }
          //US Bonds
          this.bubbleChartPlotOptions.series[4].data = [];
          for(var t_i = 0; t_i < data_results.US_Bonds_index.length; t_i++){
            var t_entry = {
                name    :   data_results.US_Bonds_index[t_i],
                value   :   data_results.US_Bonds_values[t_i]*100
            }
            this.bubbleChartPlotOptions.series[4].data.push(t_entry);
          }
          //EA Bonds
          this.bubbleChartPlotOptions.series[5].data = [];
          for(var t_i = 0; t_i < data_results.EA_Bonds_index.length; t_i++){
            var t_entry = {
                name    :   data_results.EA_Bonds_index[t_i],
                value   :   data_results.EA_Bonds_values[t_i]*100
            }
            this.bubbleChartPlotOptions.series[5].data.push(t_entry);
          }
          //Japan Bonds
          this.bubbleChartPlotOptions.series[6].data = [];
          for(var t_i = 0; t_i < data_results.JP_Bonds_index.length; t_i++){
            var t_entry = {
                name    :   data_results.JP_Bonds_index[t_i],
                value   :   data_results.JP_Bonds_values[t_i]*100
            }
            this.bubbleChartPlotOptions.series[6].data.push(t_entry);
          }
          //China Bonds
          this.bubbleChartPlotOptions.series[7].data = [];
          for(var t_i = 0; t_i < data_results.CN_Bonds_index.length; t_i++){
            var t_entry = {
                name    :   data_results.CN_Bonds_index[t_i],
                value   :   data_results.CN_Bonds_values[t_i]*100
            }
            this.bubbleChartPlotOptions.series[7].data.push(t_entry);
          }
          //EM Bonds
          this.bubbleChartPlotOptions.series[8].data = [];
          for(var t_i = 0; t_i < data_results.EM_Bonds_index.length; t_i++){
            var t_entry = {
                name    :   data_results.EM_Bonds_index[t_i],
                value   :   data_results.EM_Bonds_values[t_i]*100
            }
            this.bubbleChartPlotOptions.series[8].data.push(t_entry);
          }
          //Misc Bonds
          this.bubbleChartPlotOptions.series[9].data = [];
          for(var t_i = 0; t_i < data_results.Misc_index.length; t_i++){
            var t_entry = {
                name    :   data_results.Misc_index[t_i],
                value   :   data_results.Misc_values[t_i]*100
            }
            this.bubbleChartPlotOptions.series[9].data.push(t_entry);
          }
          this.bubbleChartPlot = new Chart(this.bubbleChartPlotOptions);
          this.bubbleChartPlotFlag = true;
      });
    }

    ngOnInit() {
    }
}



