import { Component , NgZone} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import 'rxjs/add/operator/map'

import { MapChart } from 'angular-highcharts';
import { Chart } from 'angular-highcharts';
import { StockChart } from 'angular-highcharts';
import { TranslateService } from '@ngx-translate/core';

export interface World_Map_Entry{
    country: string;
    country_code: string;
    updatedDate: string;
    updatedDate_next: string;
    value: number;
    importance: number;
};

//Plotting series
export interface Economic_Series_Timepoints{
    measure: string;
    country: string;
    variable: string;
    format: string;
    time: string;
    value: number;
};

export interface Economic_Series_Values{
    value_tm2: number;
    value_tm1: number;
    value_tm0: number;
    value_tp1: number;
    value_tp2: number;
    
    stamp_tm2: string;
    stamp_tm1: string;
    stamp_tm0: string;
    stamp_tp1: string;
    stamp_tp2: string;
    
    country: string;
    series_name: string;
    series_format: string;
    last_update: string;
};

export interface Economic_Series{
    last_updated: string;
    series_name: string;
    series_format: string;
    series : Economic_Series_Values[];
};

export interface Economic_Polygon{
    country: string;
    category: string;
    horizon: string;
    value : number;
};

export interface Economic_Cycle{
    country: string;
    time: string;
    value : number;
};

//FX object
export interface FX_data{
    FX_index: string[];
    FX_values : number[];
};

export interface NEER_data{
    NEER_index: string[];
    NEER_values : number[];
};

export interface REER_data{
    REER_index: string[];
    REER_values : number[];
};

export interface Curve_Data{
    country: string;
    scenario: string;
    time: string;
    tenor : number;
    value : number;    
    updatedDate: string;
    updatedDate_next: string;
};

//VaR objects
export interface VaR_Data{
      //CPI
      CPI_index: string[],
      CPI_q10_values: string[],
      CPI_CreditTOGDP_values: string[],
      CPI_CreditTOGDPNFC_values: string[],
      CPI_CreditTOGDPNF_values: string[],
      CPI_NPLTOLoans_values: string[],
      CPI_LiquidityAssets_values: string[],
      CPI_ComRELoans_values: string[],
      CPI_ResidRELoans_values: string[],
      CPI_RHousePrice_values: string[],
      CPI_HouPricInc_values: string[],
      CPI_HouPricRent_values: string[],
      CPI_LongYield_values: string[],
      CPI_ShortYield_values: string[],
      CPI_TermSpread_values: string[],
      //Growth
      Growth_index: string[],
      Growth_q10_values: string[],
      Growth_CreditTOGDP_values: string[],
      Growth_CreditTOGDPNFC_values: string[],
      Growth_CreditTOGDPNF_values: string[],
      Growth_NPLTOLoans_values: string[],
      Growth_LiquidityAssets_values: string[],
      Growth_ComRELoans_values: string[],
      Growth_ResidRELoans_values: string[],
      Growth_RHousePrice_values: string[],
      Growth_HouPricInc_values: string[],
      Growth_HouPricRent_values: string[],
      Growth_LongYield_values: string[],
      Growth_ShortYield_values: string[],
      Growth_TermSpread_values: string[],
      //Equties
      Equities_index: string[],
      Equities_q10_values: string[],
      Equities_CreditTOGDP_values: string[],
      Equities_CreditTOGDPNFC_values: string[],
      Equities_CreditTOGDPNF_values: string[],
      Equities_NPLTOLoans_values: string[],
      Equities_LiquidityAssets_values: string[],
      Equities_ComRELoans_values: string[],
      Equities_ResidRELoans_values: string[],
      Equities_RHousePrice_values: string[],
      Equities_HouPricInc_values: string[],
      Equities_HouPricRent_values: string[],
      Equities_LongYield_values: string[],
      Equities_ShortYield_values: string[],
      Equities_TermSpread_values: string[]
}

export interface Growth_SupplyDemand{
    country: string;
    Growth_index: string[];
    Growth_demand : number[];
    Growth_supply : number[];
    Growth_actual : number[];
    run_date: string;
};

export interface Growth_SupplyDemandTri{
    country: string;
    Growth_index: string[];
    Growth_demand : number[];
    Growth_supply : number[];
    Growth_longrun : number[];
    run_date: string;
};

//
//Income table
export interface Income_table_data{
    data_columns: string[];
    data_last_q: string[];
    data_current: string[];
    data_baseline: string[];
    data_consensus: string[];
};

declare var require: any;
const worldMap = require('@highcharts/map-collection/custom/world.geo.json');


@Component({
    selector: 'app-atlas',
    templateUrl: './atlas.component.html',
    styleUrls: ['./atlas.component.scss']
})


export class AtlasComponent {
    
    currentCountryDetailsQoQ : Economic_Series[];
    currentCountryDetailsYoY : Economic_Series[];
    
    worldMapData : World_Map_Entry[];
    
    //Map selector
    countrySelector = (event: any) => {
        let t_name = this.worldMapData.filter(stop => stop.country_code == event.point["country_code"])[0];
        this.countrySelectorDrop(t_name.country);
    };
    
    flag_cycles = null
    flag_factors = null
    
    public cycleTrackerOptions: any = {
        accessibility: {
            description: null
        },
        title: {
            text: null
        },
        xAxis: {
            type: 'category',
            tickInterval: 1,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'Cycle'
            },
            tickInterval: 1,
            max: 6,
            min: 1,
            allowDecimals: false
        },
        legend: {
            enabled: false,  
        },
        tooltip: {
            shared: true,
            pointFormat: '<span>Cluster:<b>{point.y:,.0f}</b><br/>'
        },
        series: [{
            color: "#009DA0",
            data: [
                ["1998Q1", 1]
                ]
        }]
    }
    
    public keyCategoriesOptions: any = {
        chart: {
            polar: true,
        },
    
        accessibility: {
            description: null
        },
    
        title: {
            text: ""
        },
    
        pane: {
            size: '75%'
        },
    
        xAxis: {
            categories: ['Growth', 'Prices', 'Production', 'Consumption', 'Trade', 'Labour'],
            tickmarkPlacement: 'on',
            lineWidth: 0
        },
    
        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0,
            max: 200
        },
    
        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
        },
    
        legend: {
            align: 'center',
            verticalAlign: 'bottom'
        },
    
        series: [{
            name: 'Last Month',
            type: 'line',
            color: "#A00300",
            data: [70, 120, 140, 80, 60, 20],
            pointPlacement: 'on'
        },{
            name: 'Now',
            type: 'line',
            color: "#000000",
            data: [100, 100, 100, 100, 100, 100],
            pointPlacement: 'on'
        },{
            name: 'Next Month',
            type: 'line',
            color: "#009DA0",
            data: [120, 110, 120, 80, 60, 20],
            pointPlacement: 'on'
        }]
    };

    public lineOptions: any = {
            title: {
                text: null
            },
            rangeSelector: {
                enabled:false
            },
            yAxis: {
                title: {
                    text: "Annualized Change & Uncertainty"
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
                name: 'Growth',
                color: "#000000",
                data: []
            }, {
                name: 'Upper',
                color: "#009DA0",
                data: []
            },{
                name: 'Lower',
                color: "#009DA0",
                data: []
            }]
    };

    public mapOptions: any = {
        credits: {
            enabled: false
        },
        title: {
            text: null
        },
        subtitle: {
            text: null
        },
        xAxis: {
            tickPixelInterval: 50,
            crosshair: true
        },
        chart: {
            height: 600,
            spacingLeft: 0,
            map: worldMap
        },
        mapNavigation: {
          enabled: true,
          enableMouseWheelZoom: false,
          buttonOptions: {
            alignTo: 'spacingBox'
          }
        },
        colorAxis: {
            min: 0,
            max: 10,
            minColor: '#00efdd',
            maxColor: '#001715'
        },
        yAxis: {
            title: null,
            opposite: true
        },
        tooltip: {
            split: false
        },
        plotOptions: {
            series: {
                animation: {
                    duration: 500
                },
                marker: {
                enabled: false
                }
            }
        },
        exporting: {
           enabled: false
        },
        series: [{
            type: null,
            point:{
                events:{
                    click: this.countrySelector
                }
            },
            name: "Real Growth",
            allAreas: true,
            data: [],
            mapData: worldMap,
            joinBy: ['iso-a2', 'country_code']
        }]
        //rgb(0, 157, 160);
    };
    
    mapChart : any;
    lineChart : any;
    mapKey : any;
    cycleTracker : any;
    
    subscription: Subscription;
    
    refreshDate: any;
    refreshDate_next: any;
    
    //Curvve plots
    curvePlot = null;
    curvePlotFlag  = null;
    public curvePlotOptions: any = {
        chart: {
           type: 'spline'
        },
        title: {
            text: ''
        },
        
        yAxis: {
            title: {
                text: 'Annual Yield (%)'
            }
        },

        xAxis: {
            categories: ['O/N', '1M', '2M', '3M', '6M', '1Y', '2Y', '3Y', '5Y', '7Y', '10Y', '15Y','20Y']
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                }
            }
        },
        
        series: [{
            name: 'Current',
            color: "#000000",
            data: []
        }, {
            name: 'Future Point',
            color: "#009DA0",
            data: []
        }],
        
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    };
    
    //Tenors
    tenorList: string[];
    pulledCurvedData: Curve_Data[];
    
    //Time point list  
    currentTimepoint: string= "2020-01-01";
    selectedTimepoint: string= "2025-03-01";
    timepointList: string[];
    timepointSelectorDrop(newSortOrder: string){
      this.selectedTimepoint = newSortOrder;
      this.plottingSelectedCurve();
    }

    flag_fx = false;
    flag_fxPLOT = false;
    flag_NEERPLOT = false;
    flag_REERPLOT = false;
    //
    lineChartFXPlot = null;
    lineChartNEERPlot = null;
    lineChartREERPlot = null;
    
    public lineChartFXPlotOptions: any = {
        title: {
            text: null
        },
        rangeSelector: {
            enabled:false
        },
        yAxis: {
            title: {
                text: "Nominal FX of country to USD"
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
            name: 'Central point',
            color: "#009DA0",
            data: []
        }]
    };

    public lineChartNEERPlotOptions: any = {
            title: {
                text: null
            },
            rangeSelector: {
                enabled:false
            },
            yAxis: {
                title: {
                    text: "Nominal Effective Exchange Rate"
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
                name: 'Central point',
                color: "#009DA0",
                data: []
            }]
        };
    
    public lineChartREERPlotOptions: any = {
            title: {
                text: null
            },
            rangeSelector: {
                enabled:false
            },
            yAxis: {
                title: {
                    text: "Real Effective Exchange Rate (CPI)" 
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
                name: 'Central point',
                color: "#009DA0",
                data: []
            }]
        };

    //
    //VaR
    //
    flag_VaR = false;
    flag_VaRGrowthPLOT = false;
    flag_VaRInflationPLOT = false;
    flag_VaREquitiesPLOT = false;
    //
    lineChartVaRGrowthDrivers = null;
    lineChartVaRGrowthQuantile = null;
    lineChartVaRInflationDrivers = null;
    lineChartVaRInflationQuantile = null;
    lineChartVaREquitiesDrivers = null;
    lineChartVaREquitiesQuantile = null;

    //
    public lineChartVaRGrowthDriversOptions: any = {
        title: {
            text: "Extreme growth outcome drivers"
        },
        rangeSelector: {
            enabled:false
        },
        yAxis: {
            title: {
                text: "Event probability"
            }
        },
        
        tooltip: {
            crosshairs: true,
            shared: true,
            pointFormat: "{series.name}: {point.y:.2f}%"
        },
        
        legend: {
            enabled: false
        },
        
        series: []
    };
    public lineChartVaRGrowthQuantileOptions: any = {
        title: {
            text: "Dynamic 10% lower growth tail value"
        },
        rangeSelector: {
            enabled:false
        },
        yAxis: {
            title: {
                text: "QoQ outcome value"
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

    public lineChartVaRInflationDriversOptions: any = {
        title: {
            text: "Extreme inflation outcome drivers"
        },
        rangeSelector: {
            enabled:false
        },
        yAxis: {
            title: {
                text: "Event probability"
            }
        },
        
        tooltip: {
            crosshairs: true,
            shared: true,
            pointFormat: "{series.name}: {point.y:.2f}%"
        },
        
        legend: {
            enabled: false
        },
        
        series: []
    };
    public lineChartVaRInflationQuantileOptions: any = {
        title: {
            text: "Dynamic 90% upper inflation tail value"
        },
        rangeSelector: {
            enabled:false
        },
        yAxis: {
            title: {
                text: "Annual outcome value"
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
    
    public lineChartVaREquitiesDriversOptions: any = {
        title: {
            text: "Extreme equity market outcome drivers"
        },
        rangeSelector: {
            enabled:false
        },
        yAxis: {
            title: {
                text: "Event probability"
            }
        },
        
        tooltip: {
            crosshairs: true,
            shared: true,
            pointFormat: "{series.name}: {point.y:.2f}%"
        },
        
        legend: {
            enabled: false
        },
        
        series: []
    };
    public lineChartVaREquitiesQuantileOptions: any = {
        title: {
            text: "Dynamic 10% lower equity market tail value"
        },
        rangeSelector: {
            enabled:false
        },
        yAxis: {
            title: {
                text: "QoQ outcome value"
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
    
    //Decomposition
    flagGrowthSupplyDemand = false;
    lineChartGrowthSupplyDemandPlot = null;
    public lineChartGrowthSupplyDemandOptions: any = {
        title: {
            text: null
        },
        rangeSelector: {
            enabled:false
        },
        yAxis: {
            title: {
                text: "Growth QoQ AR"
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
    
        series: [
            {
                name: 'Supply shock',
//                color: "#009DA0",
                data: []
            },
            {
                name: 'Demand shock',
//                color: "#009DA0",
                data: []
            },
            {
                name: 'Growth',
//                color: "#009DA0",
                data: []
            }
        ]
    };
    //Tri
    flagGrowthSupplyTriDemand = false;
    lineChartGrowthSupplyDemandTriPlot = null;
    public lineChartGrowthSupplyDemandTriOptions: any = {
        title: {
            text: null
        },
        rangeSelector: {
            enabled:false
        },
        yAxis: {
            title: {
                text: "Growth QoQ AR"
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
    
        series: [
            {
                name: 'Supply shock',
//                color: "#009DA0",
                data: []
            },
            {
                name: 'Demand shock',
//                color: "#009DA0",
                data: []
            },
            {
                name: 'Long-run',
//                color: "#009DA0",
                data: []
            }
        ]
    };
    //
    //Income table data
    //
    flag_income_table = null
    data_income_table = null
    selectedIndustryGroup = 'Overall';
    selectedIndustrySector = 'Total';
    //
    constructor(private http: HttpClient, 
                private modalService: NgbModal,
                private router: Router,
                private readonly translate: TranslateService) {
        translate.setDefaultLang('en');
        this.curvePlotFlag = false;
    }

    ngOnInit(){
        this.selectedIndustryGroup = 'Overall';
        this.selectedIndustrySector = 'Total';
        this.curvePlotFlag = false;
        this.flag_fx = false;
        this.flag_fxPLOT = false;
        this.flag_NEERPLOT = false;
        this.flag_REERPLOT = false;
        this.flagGrowthSupplyDemand = false;
        this.flagGrowthSupplyTriDemand = false;
        this.flag_income_table = false;

        //
        this.selectedScenario = "Baseline";
        //Load scenarios
        this.scenarionList = new Array<string>();
        this.scenarionList.push("Baseline");
        //Load scenarions
        this.http.get<string[]>('https://api.alphahuntsman.com/atlas/scenarios').subscribe((data_scenarions: string[]) => {
                this.scenarionList = new Array<string>();
                for(var t_stop of data_scenarions){
                    this.scenarionList.push(t_stop);
                }
            },
            (err) => {
                this.router.navigate(['/pages/maintenance']);
            }
            );
        //Load world map data
        this.http.get<World_Map_Entry[]>('https://api.alphahuntsman.com/atlas/world?scenario='+this.selectedScenario)
            .subscribe((data_details: World_Map_Entry[]) => {
                var temp_min = 0;
                var temp_max = 10;
                this.countryList = new Array<string>();
                for(var t_stop of data_details){
                    this.countryList.push(t_stop.country);
                    this.refreshDate = t_stop.updatedDate;
                    this.refreshDate_next = t_stop.updatedDate_next;
                    temp_min = Math.min(temp_min, t_stop.value);
                    temp_max = Math.max(temp_max, t_stop.value);
                }
                this.mapOptions.series[0].data = data_details;
                this.mapOptions.colorAxis.min = temp_min;
                this.mapOptions.colorAxis.max = temp_max;
                this.mapChart = new MapChart(this.mapOptions);
                //
                this.refreshDate = new Date(this.refreshDate);
                this.worldMapData = data_details;
                this.countrySelectorDrop(this.countryList[0]);
                //Load curve data
                //Pull data
                this.curvePlotFlag = false;
                this.pullingCurveData();
                //
                this.industrySelectorDrop('Overall');
            });
    }
    
    //Dropdown selector
    selectedScenario: any;
    scenarionList: string[];
    scenarioSelectorDrop(newSortOrder: string){
        this.selectedScenario = newSortOrder;
        this.countrySelectorDrop(this.countrySelected);
    }  
    
    selectedIndustryGroupList: string[];
    industrySelectorDrop(newSortOrder: string){
        this.selectedIndustryGroup = newSortOrder;
        //Get Income sectors
        this.http.get<string[]>('https://api.alphahuntsman.com/atlas/income/industries?country='+this.countrySelectedCode.toLowerCase()+'&group='+this.selectedIndustryGroup).subscribe((data_scenarions: string[]) => {
                this.selectedIndustrySectorList = new Array<string>();
                for(var t_stop of data_scenarions){
                    this.selectedIndustrySectorList.push(t_stop);
                }
                if(this.selectedIndustrySectorList.includes('Total')){ 
                    this.selectedIndustrySector = 'Total'
                }else{
                    this.selectedIndustrySector = this.selectedIndustrySectorList[0];
                }
                this.sectorSelectorDrop(this.selectedIndustrySector);
            }
        );
        //
    } 
    //
    selectedIndustrySectorList: string[];
    sectorSelectorDrop(newSortOrder: string){
        //Setting income data
        this.flag_income_table = false;
        this.http.get<Income_table_data[]>('https://api.alphahuntsman.com/atlas/income/table?country='+this.countrySelectedCode+'&group='+this.selectedIndustryGroup+'&industry='+this.selectedIndustrySector)
             .subscribe((data_details: Income_table_data[]) => {
                 this.data_income_table = data_details[0]
                 if(this.data_income_table != null){
                     this.flag_income_table = true;
                 }else{
                     this.data_income_table = null
                 }
             }
        );
        this.selectedIndustrySector = newSortOrder;
    } 
    //
    countryList: string[];
    countrySelected : string = "World"
    countrySelectedCode : string = '';
    //Dropdown selector
    countrySelectorDrop(newSortOrder: string){ 
        this.currentCountryDetailsQoQ = null;
        this.currentCountryDetailsYoY = null;
        this.mapKey = null;
        this.cycleTracker = null;
        //table data
        this.http.get<Economic_Series_Values[]>('https://api.alphahuntsman.com/atlas/country?country='+newSortOrder+'&scenario='+this.selectedScenario)
         .subscribe((data_details: Economic_Series_Values[]) => {
            //Get distinct variables
            var t_variables = new Array<string>();
            for (var t_stop of data_details){
                if(!t_variables.includes(t_stop.series_name)){
                    t_variables.push(t_stop.series_name);
                }
            }
            //By Variable
            for (var t_name of t_variables){
                //Find qoq
                let qoq_data = data_details.filter(obj => obj.series_name == t_name && obj.series_format == "QoQ AR")[0];
                let yoy_data = data_details.filter(obj => obj.series_name == t_name && obj.series_format == "YoY")[0];
                //console.log(data_details[0]);
                if(!this.currentCountryDetailsQoQ && qoq_data){
                    this.currentCountryDetailsQoQ = new Array<Economic_Series>();
                }
                if(!this.currentCountryDetailsYoY && yoy_data){
                    this.currentCountryDetailsYoY = new Array<Economic_Series>();
                }
                if(qoq_data){
                    let t_entry = {
                        last_updated : new Date(qoq_data.last_update).toISOString().slice(0,10),
                        series_name: t_name,
                        series_format: qoq_data.series_format,
                        series: new Array<Economic_Series_Values>()
                    };
                    t_entry.series.push(qoq_data);
                    this.currentCountryDetailsQoQ.push(t_entry);
                }
                if(yoy_data){
                    let t_entry = {
                        last_updated : new Date(yoy_data.last_update).toISOString().slice(0,10),
                        series_name: t_name,
                        series_format: yoy_data.series_format,
                        series: new Array<Economic_Series_Values>()
                    };
                    t_entry.series.push(yoy_data);
                    this.currentCountryDetailsYoY.push(t_entry);
                }
            }
            //
            this.curvePlotFlag = false;
            this.flag_fx = false;
            this.flag_fxPLOT = false;
            this.flag_NEERPLOT = false;
            this.flag_REERPLOT = false;
            this.flagGrowthSupplyDemand = false;
            this.flagGrowthSupplyTriDemand = false;

            //Pull data
            this.pullingCurveData()
            //FX data
            this.pullinFXData();
            //VaR
            this.pullingVaRData();
            //Growth supply demand decomposition
            this.pullingGrowthSupplyDemand();
            this.pullingGrowthSupplyDemandTri();
            //let test_object = "Real Growth";
            //let test_data = data_details.filter(obj => test_object == t_name && obj.series_format == "QoQ AR");
            //console.log(test_data);
         });
    
        //factor data
        //Refresh country details
        this.countrySelected = newSortOrder;
        //Setting details
        let country_name = this.worldMapData.filter(stop => stop.country == newSortOrder)[0].country_code;
        this.flag_factors = false;
        this.countrySelectedCode = country_name.toLowerCase();
        this.http.get<Economic_Polygon[]>('https://api.alphahuntsman.com/atlas/countrystr?country='+country_name.toUpperCase()+'&scenario='+this.selectedScenario)
             .subscribe((data_details: Economic_Polygon[]) => {
                const temp_horizon_list = ['Before','Now','Future'];
                const temp_category_list = ['Growth', 'Prices', 'Production', 'Consumption', 'Trade', 'Labour'];
                let t_loop_counter = 0;
                for(var t_cate_horizon of temp_horizon_list){
                    const temp_data_values = [];
                    for(var t_cate_stop of temp_category_list){
                        if(data_details.filter(t_obj => t_obj.category == t_cate_stop && t_obj.horizon == t_cate_horizon).length > 0){
                            temp_data_values.push(data_details.filter(t_obj => t_obj.category == t_cate_stop && t_obj.horizon == t_cate_horizon)[0].value);
                            this.flag_factors = true;
                        }
                    }
                    this.keyCategoriesOptions.series[t_loop_counter].data = temp_data_values;
                    t_loop_counter += 1;
                }
                this.mapKey = new Chart(this.keyCategoriesOptions);
             });
        //Setting cycle data
        this.flag_cycles = false;
        this.http.get<Economic_Cycle[]>('https://api.alphahuntsman.com/atlas/countrycycle?country='+country_name.toUpperCase()+'&scenario='+this.selectedScenario)
             .subscribe((data_details: Economic_Cycle[]) => {
                const temp_data_values = [];
                for(var t_entry of data_details){
                    temp_data_values.push([t_entry.time,t_entry.value]);
                    this.flag_cycles = true;
                }
                this.cycleTrackerOptions.series[0].data = temp_data_values;
                this.cycleTracker = new Chart(this.cycleTrackerOptions);
             });
        //Get Income industries
        this.http.get<string[]>('https://api.alphahuntsman.com/atlas/income/groups?country='+country_name.toLowerCase()).subscribe((data_scenarions: string[]) => {
                this.selectedIndustryGroupList = new Array<string>();
                for(var t_stop of data_scenarions){
                    this.selectedIndustryGroupList.push(t_stop);
                }
                this.industrySelectorDrop('Overall');
            }
        );
    }

    
    modal_data_mean : Economic_Series_Timepoints[];
    modal_data_upper : Economic_Series_Timepoints[];
    modal_data_lower : Economic_Series_Timepoints[];
    
    //Modal details
    title: string;
    GetDetails(content, t_variable, data_format) {
        this.modal_data_mean = null;
        this.modal_data_upper = null;
        this.modal_data_lower = null;
        var format_qoq_ar = "QoQ AR";
        this.http.get<Economic_Series_Timepoints[]>('https://api.alphahuntsman.com/atlas/series?country='+this.countrySelected+"&variable="+t_variable+"&format="+data_format+'&scenario='+this.selectedScenario)
             .subscribe((data_details: Economic_Series_Timepoints[]) => {
                this.modal_data_mean = data_details.filter(temp => temp.measure == "Mean");
                this.modal_data_upper = data_details.filter(temp => temp.measure == "Upper");
                this.modal_data_lower = data_details.filter(temp => temp.measure == "Lower");
                
                //Sort to plot
                const lineplot_data_mean = [];
                const lineplot_data_upper = [];
                const lineplot_data_lower = [];
                for(var t_inner of this.modal_data_mean){
                    if(t_inner.format == format_qoq_ar){
                        let temp_year = t_inner.time.split("Q")[0]
                        let temp_month = 1+(Number(t_inner.time.split("Q")[1])-1)*3;
                        let temp_unix = new Date(temp_year + "-"+temp_month+"-01");
                        let temp_unix_no = temp_unix.getTime()
                        lineplot_data_mean.push([temp_unix_no, Math.round(t_inner.value * 1000) / 1000])
                    }else{
                        let temp_unix = new Date(t_inner.time+"-01-01");
                        let temp_unix_no = temp_unix.getTime()
                        lineplot_data_mean.push([temp_unix_no, Math.round(t_inner.value * 1000) / 1000])
                    }
                };
                //Upper values
                for(var t_inner of this.modal_data_upper){
                    if(t_inner.format == format_qoq_ar){
                        let temp_year = t_inner.time.split("Q")[0]
                        let temp_month = 1+(Number(t_inner.time.split("Q")[1])-1)*3;
                        let temp_unix = new Date(temp_year + "-"+temp_month+"-01");
                        let temp_unix_no = temp_unix.getTime()
                        lineplot_data_upper.push([temp_unix_no, Math.round(t_inner.value * 1000) / 1000])
                    }else{
                        let temp_unix = new Date(t_inner.time+"-01-01");
                        let temp_unix_no = temp_unix.getTime()
                        lineplot_data_upper.push([temp_unix_no, Math.round(t_inner.value * 1000) / 1000])
                    }
                };
                //Lower values
                for(var t_inner of this.modal_data_lower){
                    if(t_inner.format == format_qoq_ar){
                        let temp_year = t_inner.time.split("Q")[0]
                        let temp_month = 1+(Number(t_inner.time.split("Q")[1])-1)*3;
                        let temp_unix = new Date(temp_year + "-"+temp_month+"-01");
                        let temp_unix_no = temp_unix.getTime()
                        lineplot_data_lower.push([temp_unix_no, Math.round(t_inner.value * 1000) / 1000])
                    }else{
                        let temp_unix = new Date(t_inner.time+"-01-01");
                        let temp_unix_no = temp_unix.getTime()
                        lineplot_data_lower.push([temp_unix_no, Math.round(t_inner.value * 1000) / 1000])
                    }
                };
                this.lineChart = new StockChart(this.lineOptions);
                this.lineOptions.series[0].data = lineplot_data_mean;
                this.lineOptions.series[1].data = lineplot_data_lower;
                this.lineOptions.series[2].data = lineplot_data_upper;
                window.dispatchEvent(new Event('resize'));
                //Final model activation
                let series_name: string;
                this.translate.get('ATLAS.series_names.' + t_variable).subscribe(result => series_name = result);
                this.translate.get('ATLAS.' + data_format).subscribe(result => {
                    this.title = `${series_name} ${result}`;
                });
                this.modalService.open(content, {windowClass : "atlasIndexPlot"}).result.then((result) => {      
                    }, (reason) => {     
                });
             });
    }

    async pullinFXData(){
        /*
        //Get tenors
        var countrySelectedCurve = this.countrySelected;
        if (countrySelectedCurve == "United Kingdom"){
            countrySelectedCurve = "UK";
        }else if (countrySelectedCurve == "United States"){
            countrySelectedCurve = "US";
        }else if (countrySelectedCurve == "Austria"){
            countrySelectedCurve = "EA";
        }else if (countrySelectedCurve == "Belgium"){
            countrySelectedCurve = "EA";
        }else if (countrySelectedCurve == "Estonia"){
            countrySelectedCurve = "EA";
        }else if (countrySelectedCurve == "Finland"){
            countrySelectedCurve = "EA";
        }else if (countrySelectedCurve == "France"){
            countrySelectedCurve = "EA";
        }else if (countrySelectedCurve == "Germany"){
            countrySelectedCurve = "EA";
        }else if (countrySelectedCurve == "Ireland"){
            countrySelectedCurve = "EA";
        }else if (countrySelectedCurve == "Italy"){
            countrySelectedCurve = "EA";
        }else if (countrySelectedCurve == "Latvia"){
            countrySelectedCurve = "EA";
        }else if (countrySelectedCurve == "Lithuania"){
            countrySelectedCurve = "EA";
        }else if (countrySelectedCurve == "Netherlands"){
            countrySelectedCurve = "EA";
        }else if (countrySelectedCurve == "Portugal"){
            countrySelectedCurve = "EA";
        }else if (countrySelectedCurve == "Spain"){
            countrySelectedCurve = "EA";
        }

        //FX data
        this.http.get<NEER_data>('https://api.alphahuntsman.com/exchange/NEER?country='+countrySelectedCurve+'&scenario='+this.selectedScenario)
         .subscribe((data_details_NEER: NEER_data) => {
             ///
            this.http.get<REER_data>('https://api.alphahuntsman.com/exchange/REER?country='+countrySelectedCurve+'&scenario='+this.selectedScenario)
                 .subscribe((data_details_REER: REER_data) => {
                    //FX
                    this.http.get<FX_data>('https://api.alphahuntsman.com/exchange/FX?country='+countrySelectedCurve+'&scenario='+this.selectedScenario)
                     .subscribe((data_details_FX: FX_data) => {
                        //Get timepoints
                        if(this.tenorList.length < 1){
                            this.flag_fx = false;
                        }else{
                            //FX
                            const plot_data = [];
                            for (var t_stop = 1;t_stop < data_details_FX[0].FX_index.length;t_stop++){
                                let temp_unix = new Date(data_details_FX[0].FX_index[t_stop]);
                                let temp_unix_no = temp_unix.getTime();
                                //
                                let temp_value_m = Number(data_details_FX[0].FX_values[t_stop]);
                                //                                
                                plot_data.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
                            }
                            this.lineChartFXPlot = new StockChart(this.lineChartFXPlotOptions);
                            //Setting
                            this.lineChartFXPlotOptions.series[0].data = plot_data;                            //
                            this.flag_fxPLOT = true;
                            //
                            //NEER
                            //
                            const plot_data2 = [];
                            for (var t_stop = 1;t_stop < data_details_NEER[0].NEER_index.length;t_stop++){
                                let temp_unix = new Date(data_details_NEER[0].NEER_index[t_stop]);
                                let temp_unix_no = temp_unix.getTime();
                                //
                                let temp_value_m = Number(data_details_NEER[0].NEER_values[t_stop]);
                                //                                
                                plot_data2.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
                            }
                            this.lineChartNEERPlot = new StockChart(this.lineChartNEERPlotOptions);
                            //Setting
                            this.lineChartNEERPlotOptions.series[0].data = plot_data2;                            //
                            this.flag_NEERPLOT = true;                            
                            //
                            //REER
                            //
                            const plot_data3 = [];
                            for (var t_stop = 1;t_stop < data_details_REER[0].REER_index.length;t_stop++){
                                let temp_unix = new Date(data_details_REER[0].REER_index[t_stop]);
                                let temp_unix_no = temp_unix.getTime();
                                //
                                let temp_value_m = Number(data_details_REER[0].REER_values[t_stop]);
                                //                                
                                plot_data3.push([temp_unix_no, Math.round(temp_value_m * 1000) / 1000])
                            }
                            this.lineChartREERPlot = new StockChart(this.lineChartREERPlotOptions);
                            //Setting
                            this.lineChartREERPlotOptions.series[0].data = plot_data3;                            //
                            this.flag_REERPLOT = true;   
                            //
                            this.flag_fx = true;
                        }
                });

            });

        });
        */
    }
    
    async pullingVaRData(){
        //
        var countrySelectedCurve = this.countrySelected;
        if (countrySelectedCurve == "United Kingdom"){
            countrySelectedCurve = "UK";
        }else if (countrySelectedCurve == "United States"){
            countrySelectedCurve = "US";
        }
        //VaR
        /*
        this.http.get<VaR_Data>('https://api.alphahuntsman.com/valueatrisk/VaR?country='+countrySelectedCurve)
         .subscribe((data_VaR: VaR_Data) => {
            //Get timepoints
            if(!data_VaR){
                this.flag_VaR = false;
            }else{
                //Growth
                if (data_VaR.Growth_index){
                    const plot_data_q10 = [];
                    const plot_data_CreditTOGDP = [];
                    const plot_data_CreditTOGDPNFC = [];
                    const plot_data_CreditTOGDPNF = [];
                    const plot_data_NPLTOLoans = [];
                    const plot_data_LiquidityAssets = [];
                    const plot_data_ComRELoans = [];
                    const plot_data_ResidRELoans = [];
                    const plot_data_RHousePrice = [];
                    const plot_data_HouPricInc = [];
                    const plot_data_HouPricRent = [];
                    const plot_data_LongYield = [];
                    const plot_data_ShortYield = [];
                    const plot_data_TermSpread = [];
                    for (var t_stop = 1;t_stop < data_VaR.Growth_index.length;t_stop++){
                        let temp_unix = new Date(data_VaR.Growth_index[t_stop]);
                        let temp_unix_no = temp_unix.getTime();
                        //
                        if (data_VaR.Growth_q10_values){
                            plot_data_q10.push([temp_unix_no, Math.round(Number(data_VaR.Growth_q10_values[t_stop]) * 1000) / 1000])
                        }
                        if (data_VaR.Growth_CreditTOGDP_values){
                            plot_data_CreditTOGDP.push([temp_unix_no, Math.round(Number(data_VaR.Growth_CreditTOGDP_values[t_stop]) * 1000) / 10])
                        }
                        if (data_VaR.Growth_CreditTOGDPNFC_values){
                            plot_data_CreditTOGDPNFC.push([temp_unix_no, Math.round(Number(data_VaR.Growth_CreditTOGDPNFC_values[t_stop]) * 1000) / 10])
                        }
                        if (data_VaR.Growth_CreditTOGDPNF_values){
                            plot_data_CreditTOGDPNF.push([temp_unix_no, Math.round(Number(data_VaR.Growth_CreditTOGDPNF_values[t_stop]) * 1000) / 10])
                        }
                        if (data_VaR.Growth_NPLTOLoans_values){
                            plot_data_NPLTOLoans.push([temp_unix_no, Math.round(Number(data_VaR.Growth_NPLTOLoans_values[t_stop]) * 1000) / 10])
                        }
                        if (data_VaR.Growth_LiquidityAssets_values){
                            plot_data_LiquidityAssets.push([temp_unix_no, Math.round(Number(data_VaR.Growth_LiquidityAssets_values[t_stop]) * 1000) / 10])
                        }
                        if (data_VaR.Growth_ComRELoans_values){
                            plot_data_ComRELoans.push([temp_unix_no, Math.round(Number(data_VaR.Growth_ComRELoans_values[t_stop]) * 1000) / 10])
                        }
                        if (data_VaR.Growth_ResidRELoans_values){
                            plot_data_ResidRELoans.push([temp_unix_no, Math.round(Number(data_VaR.Growth_ResidRELoans_values[t_stop]) * 1000) / 10])
                        }
                        if (data_VaR.Growth_RHousePrice_values){
                            plot_data_RHousePrice.push([temp_unix_no, Math.round(Number(data_VaR.Growth_RHousePrice_values[t_stop]) * 1000) / 10])
                        }
                        if (data_VaR.Growth_HouPricInc_values){
                            plot_data_HouPricInc.push([temp_unix_no, Math.round(Number(data_VaR.Growth_HouPricInc_values[t_stop]) * 1000) / 10])
                        }
                        if (data_VaR.Growth_HouPricRent_values){
                            plot_data_HouPricRent.push([temp_unix_no, Math.round(Number(data_VaR.Growth_HouPricRent_values[t_stop]) * 1000) / 10])
                        }
                        if (data_VaR.Growth_LongYield_values){
                            plot_data_LongYield.push([temp_unix_no, Math.round(Number(data_VaR.Growth_LongYield_values[t_stop]) * 1000) / 10])
                        }
                        if (data_VaR.Growth_ShortYield_values){
                            plot_data_ShortYield.push([temp_unix_no, Math.round(Number(data_VaR.Growth_ShortYield_values[t_stop]) * 1000) / 10])
                        }
                        if (data_VaR.Growth_TermSpread_values){
                            plot_data_TermSpread.push([temp_unix_no, Math.round(Number(data_VaR.Growth_TermSpread_values[t_stop]) * 1000) / 10])
                        }
                    }
                    this.lineChartVaRGrowthDrivers = new StockChart(this.lineChartVaRGrowthDriversOptions);
                    this.lineChartVaRGrowthQuantile = new StockChart(this.lineChartVaRGrowthQuantileOptions);
                    this.lineChartVaRGrowthDriversOptions.series = [];
                    this.lineChartVaRGrowthQuantileOptions.series = [];
                    //Setting
                    if(plot_data_CreditTOGDP.length > 0){
                        var entry : any = {
                            name: "Credit-to-GDP",
                            data: plot_data_CreditTOGDP
                        };
                        this.lineChartVaRGrowthDriversOptions.series.push(entry);
                    }
                    if(plot_data_CreditTOGDPNFC.length > 0){
                        var entry : any = {
                            name: "Credit-to-GDP NFC",
                            data: plot_data_CreditTOGDPNFC
                        };
                        this.lineChartVaRGrowthDriversOptions.series.push(entry);
                    }
                    if(plot_data_CreditTOGDPNF.length > 0){
                        var entry : any = {
                            name: "Credit-to-GDP non-financials",
                            data: plot_data_CreditTOGDPNF
                        };
                        this.lineChartVaRGrowthDriversOptions.series.push(entry);
                    }
                    if(plot_data_NPLTOLoans.length > 0){
                        var entry : any = {
                            name: "Nonperforming liabilities to loans",
                            data: plot_data_NPLTOLoans
                        };
                        this.lineChartVaRGrowthDriversOptions.series.push(entry);
                    }
                    if(plot_data_LiquidityAssets.length > 0){
                        var entry : any = {
                            name: "Liquidity of assets",
                            data: plot_data_LiquidityAssets
                        };
                        this.lineChartVaRGrowthDriversOptions.series.push(entry);
                    }
                    if(plot_data_ComRELoans.length > 0){
                        var entry : any = {
                            name: "Com. real estate loans",
                            data: plot_data_ComRELoans
                        };
                        this.lineChartVaRGrowthDriversOptions.series.push(entry);
                    }
                    if(plot_data_ResidRELoans.length > 0){
                        var entry : any = {
                            name: "Residential real estate loans",
                            data: plot_data_ResidRELoans
                        };
                        this.lineChartVaRGrowthDriversOptions.series.push(entry);
                    }
                    if(plot_data_RHousePrice.length > 0){
                        var entry : any = {
                            name: "Residential house prices",
                            data: plot_data_RHousePrice
                        };
                        this.lineChartVaRGrowthDriversOptions.series.push(entry);
                    }
                    if(plot_data_HouPricInc.length > 0){
                        var entry : any = {
                            name: "House price to income",
                            data: plot_data_HouPricInc
                        };
                        this.lineChartVaRGrowthDriversOptions.series.push(entry);
                    }                    
                    if(plot_data_HouPricRent.length > 0){
                        var entry : any = {
                            name: "House price to rent",
                            data: plot_data_HouPricRent
                        };
                        this.lineChartVaRGrowthDriversOptions.series.push(entry);
                    }                    
                    if(plot_data_LongYield.length > 0){
                        var entry : any = {
                            name: "Long yields",
                            data: plot_data_LongYield
                        };
                        this.lineChartVaRGrowthDriversOptions.series.push(entry);
                    }       
                    if(plot_data_ShortYield.length > 0){
                        var entry : any = {
                            name: "Short yields",
                            data: plot_data_ShortYield
                        };
                        this.lineChartVaRGrowthDriversOptions.series.push(entry);
                    }                    
                    if(plot_data_TermSpread.length > 0){
                        var entry : any = {
                            name: "Term spread",
                            data: plot_data_TermSpread
                        };
                        this.lineChartVaRGrowthDriversOptions.series.push(entry);
                    }      
                    //
                    var entry : any = {
                        name: "Tail value",
                        data: plot_data_q10,
                        color: "#009DA0"
                    };
                    this.lineChartVaRGrowthQuantileOptions.series.push(entry);
                    //Setting
                    this.flag_VaRGrowthPLOT = true;
                }
                //Inflation
                if (data_VaR.CPI_index){
                    const plot_data_q10 = [];
                    const plot_data_CreditTOGDP = [];
                    const plot_data_CreditTOGDPNFC = [];
                    const plot_data_CreditTOGDPNF = [];
                    const plot_data_NPLTOLoans = [];
                    const plot_data_LiquidityAssets = [];
                    const plot_data_ComRELoans = [];
                    const plot_data_ResidRELoans = [];
                    const plot_data_RHousePrice = [];
                    const plot_data_HouPricInc = [];
                    const plot_data_HouPricRent = [];
                    const plot_data_LongYield = [];
                    const plot_data_ShortYield = [];
                    const plot_data_TermSpread = [];
                    for (var t_stop = 1;t_stop < data_VaR.CPI_index.length;t_stop++){
                        let temp_unix = new Date(data_VaR.CPI_index[t_stop]);
                        let temp_unix_no = temp_unix.getTime();
                        //
                        if (data_VaR.CPI_q10_values){
                            plot_data_q10.push([temp_unix_no, Math.round(Number(data_VaR.CPI_q10_values[t_stop]) * 1000) / 1000])
                        }
                        if (data_VaR.CPI_CreditTOGDP_values){
                            plot_data_CreditTOGDP.push([temp_unix_no, Math.round(Number(data_VaR.CPI_CreditTOGDP_values[t_stop]) * 1000) / 10])
                        }
                        if (data_VaR.CPI_CreditTOGDPNFC_values){
                            plot_data_CreditTOGDPNFC.push([temp_unix_no, Math.round(Number(data_VaR.CPI_CreditTOGDPNFC_values[t_stop]) * 1000) / 10])
                        }
                        if (data_VaR.CPI_CreditTOGDPNF_values){
                            plot_data_CreditTOGDPNF.push([temp_unix_no, Math.round(Number(data_VaR.CPI_CreditTOGDPNF_values[t_stop]) * 1000) / 10])
                        }
                        if (data_VaR.CPI_NPLTOLoans_values){
                            plot_data_NPLTOLoans.push([temp_unix_no, Math.round(Number(data_VaR.CPI_NPLTOLoans_values[t_stop]) * 1000) / 10])
                        }
                        if (data_VaR.CPI_LiquidityAssets_values){
                            plot_data_LiquidityAssets.push([temp_unix_no, Math.round(Number(data_VaR.CPI_LiquidityAssets_values[t_stop]) * 1000) / 10])
                        }
                        if (data_VaR.CPI_ComRELoans_values){
                            plot_data_ComRELoans.push([temp_unix_no, Math.round(Number(data_VaR.CPI_ComRELoans_values[t_stop]) * 1000) / 10])
                        }
                        if (data_VaR.CPI_ResidRELoans_values){
                            plot_data_ResidRELoans.push([temp_unix_no, Math.round(Number(data_VaR.CPI_ResidRELoans_values[t_stop]) * 1000) / 10])
                        }
                        if (data_VaR.CPI_RHousePrice_values){
                            plot_data_RHousePrice.push([temp_unix_no, Math.round(Number(data_VaR.CPI_RHousePrice_values[t_stop]) * 1000) / 10])
                        }
                        if (data_VaR.CPI_HouPricInc_values){
                            plot_data_HouPricInc.push([temp_unix_no, Math.round(Number(data_VaR.CPI_HouPricInc_values[t_stop]) * 1000) / 10])
                        }
                        if (data_VaR.CPI_HouPricRent_values){
                            plot_data_HouPricRent.push([temp_unix_no, Math.round(Number(data_VaR.CPI_HouPricRent_values[t_stop]) * 1000) / 10])
                        }
                        if (data_VaR.CPI_LongYield_values){
                            plot_data_LongYield.push([temp_unix_no, Math.round(Number(data_VaR.CPI_LongYield_values[t_stop]) * 1000) / 10])
                        }
                        if (data_VaR.CPI_ShortYield_values){
                            plot_data_ShortYield.push([temp_unix_no, Math.round(Number(data_VaR.CPI_ShortYield_values[t_stop]) * 1000) / 10])
                        }
                        if (data_VaR.CPI_TermSpread_values){
                            plot_data_TermSpread.push([temp_unix_no, Math.round(Number(data_VaR.CPI_TermSpread_values[t_stop]) * 1000) / 10])
                        }
                    }
                    this.lineChartVaRInflationDrivers = new StockChart(this.lineChartVaRInflationDriversOptions);
                    this.lineChartVaRInflationQuantile = new StockChart(this.lineChartVaRInflationQuantileOptions);
                    this.lineChartVaRInflationDriversOptions.series = [];
                    this.lineChartVaRInflationQuantileOptions.series = [];
                    //Setting
                    if(plot_data_CreditTOGDP.length > 0){
                        var entry : any = {
                            name: "Credit-to-GDP",
                            data: plot_data_CreditTOGDP
                        };
                        this.lineChartVaRInflationDriversOptions.series.push(entry);
                    }
                    if(plot_data_CreditTOGDPNFC.length > 0){
                        var entry : any = {
                            name: "Credit-to-GDP NFC",
                            data: plot_data_CreditTOGDPNFC
                        };
                        this.lineChartVaRInflationDriversOptions.series.push(entry);
                    }
                    if(plot_data_CreditTOGDPNF.length > 0){
                        var entry : any = {
                            name: "Credit-to-GDP non-financials",
                            data: plot_data_CreditTOGDPNF
                        };
                        this.lineChartVaRInflationDriversOptions.series.push(entry);
                    }
                    if(plot_data_NPLTOLoans.length > 0){
                        var entry : any = {
                            name: "Nonperforming liabilities to loans",
                            data: plot_data_NPLTOLoans
                        };
                        this.lineChartVaRInflationDriversOptions.series.push(entry);
                    }
                    if(plot_data_LiquidityAssets.length > 0){
                        var entry : any = {
                            name: "Liquidity of assets",
                            data: plot_data_LiquidityAssets
                        };
                        this.lineChartVaRInflationDriversOptions.series.push(entry);
                    }
                    if(plot_data_ComRELoans.length > 0){
                        var entry : any = {
                            name: "Com. real estate loans",
                            data: plot_data_ComRELoans
                        };
                        this.lineChartVaRInflationDriversOptions.series.push(entry);
                    }
                    if(plot_data_ResidRELoans.length > 0){
                        var entry : any = {
                            name: "Residential real estate loans",
                            data: plot_data_ResidRELoans
                        };
                        this.lineChartVaRInflationDriversOptions.series.push(entry);
                    }
                    if(plot_data_RHousePrice.length > 0){
                        var entry : any = {
                            name: "Residential house prices",
                            data: plot_data_RHousePrice
                        };
                        this.lineChartVaRInflationDriversOptions.series.push(entry);
                    }
                    if(plot_data_HouPricInc.length > 0){
                        var entry : any = {
                            name: "House price to income",
                            data: plot_data_HouPricInc
                        };
                        this.lineChartVaRInflationDriversOptions.series.push(entry);
                    }                    
                    if(plot_data_HouPricRent.length > 0){
                        var entry : any = {
                            name: "House price to rent",
                            data: plot_data_HouPricRent
                        };
                        this.lineChartVaRInflationDriversOptions.series.push(entry);
                    }                    
                    if(plot_data_LongYield.length > 0){
                        var entry : any = {
                            name: "Long yields",
                            data: plot_data_LongYield
                        };
                        this.lineChartVaRInflationDriversOptions.series.push(entry);
                    }       
                    if(plot_data_ShortYield.length > 0){
                        var entry : any = {
                            name: "Short yields",
                            data: plot_data_ShortYield
                        };
                        this.lineChartVaRInflationDriversOptions.series.push(entry);
                    }                    
                    if(plot_data_TermSpread.length > 0){
                        var entry : any = {
                            name: "Term spread",
                            data: plot_data_TermSpread
                        };
                        this.lineChartVaRInflationDriversOptions.series.push(entry);
                    }      
                    //
                    var entry : any = {
                        name: "Tail value",
                        data: plot_data_q10,
                        color: "#009DA0"
                    };
                    this.lineChartVaRInflationQuantileOptions.series.push(entry);
                    //Setting
                    this.flag_VaRInflationPLOT = true;
                }
                //Equities
                if (data_VaR.Equities_index){
                    const plot_data_q10 = [];
                    const plot_data_CreditTOGDP = [];
                    const plot_data_CreditTOGDPNFC = [];
                    const plot_data_CreditTOGDPNF = [];
                    const plot_data_NPLTOLoans = [];
                    const plot_data_LiquidityAssets = [];
                    const plot_data_ComRELoans = [];
                    const plot_data_ResidRELoans = [];
                    const plot_data_RHousePrice = [];
                    const plot_data_HouPricInc = [];
                    const plot_data_HouPricRent = [];
                    const plot_data_LongYield = [];
                    const plot_data_ShortYield = [];
                    const plot_data_TermSpread = [];
                    for (var t_stop = 1;t_stop < data_VaR.Equities_index.length;t_stop++){
                        let temp_unix = new Date(data_VaR.Equities_index[t_stop]);
                        let temp_unix_no = temp_unix.getTime();
                        //
                        if (data_VaR.Equities_q10_values){
                            plot_data_q10.push([temp_unix_no, Math.round(Number(data_VaR.Equities_q10_values[t_stop]) * 1000) / 1000])
                        }
                        if (data_VaR.Equities_CreditTOGDP_values){
                            plot_data_CreditTOGDP.push([temp_unix_no, Math.round(Number(data_VaR.Equities_CreditTOGDP_values[t_stop]) * 1000) / 10])
                        }
                        if (data_VaR.Equities_CreditTOGDPNFC_values){
                            plot_data_CreditTOGDPNFC.push([temp_unix_no, Math.round(Number(data_VaR.Equities_CreditTOGDPNFC_values[t_stop]) * 1000) / 10])
                        }
                        if (data_VaR.Equities_CreditTOGDPNF_values){
                            plot_data_CreditTOGDPNF.push([temp_unix_no, Math.round(Number(data_VaR.Equities_CreditTOGDPNF_values[t_stop]) * 1000) / 10])
                        }
                        if (data_VaR.Equities_NPLTOLoans_values){
                            plot_data_NPLTOLoans.push([temp_unix_no, Math.round(Number(data_VaR.Equities_NPLTOLoans_values[t_stop]) * 1000) / 10])
                        }
                        if (data_VaR.Equities_LiquidityAssets_values){
                            plot_data_LiquidityAssets.push([temp_unix_no, Math.round(Number(data_VaR.Equities_LiquidityAssets_values[t_stop]) * 1000) / 10])
                        }
                        if (data_VaR.Equities_ComRELoans_values){
                            plot_data_ComRELoans.push([temp_unix_no, Math.round(Number(data_VaR.Equities_ComRELoans_values[t_stop]) * 1000) / 10])
                        }
                        if (data_VaR.Equities_ResidRELoans_values){
                            plot_data_ResidRELoans.push([temp_unix_no, Math.round(Number(data_VaR.Equities_ResidRELoans_values[t_stop]) * 1000) / 10])
                        }
                        if (data_VaR.Equities_RHousePrice_values){
                            plot_data_RHousePrice.push([temp_unix_no, Math.round(Number(data_VaR.Equities_RHousePrice_values[t_stop]) * 1000) / 10])
                        }
                        if (data_VaR.Equities_HouPricInc_values){
                            plot_data_HouPricInc.push([temp_unix_no, Math.round(Number(data_VaR.Equities_HouPricInc_values[t_stop]) * 1000) / 10])
                        }
                        if (data_VaR.Equities_HouPricRent_values){
                            plot_data_HouPricRent.push([temp_unix_no, Math.round(Number(data_VaR.Equities_HouPricRent_values[t_stop]) * 1000) / 10])
                        }
                        if (data_VaR.Equities_LongYield_values){
                            plot_data_LongYield.push([temp_unix_no, Math.round(Number(data_VaR.Equities_LongYield_values[t_stop]) * 1000) / 10])
                        }
                        if (data_VaR.Equities_ShortYield_values){
                            plot_data_ShortYield.push([temp_unix_no, Math.round(Number(data_VaR.Equities_ShortYield_values[t_stop]) * 1000) / 10])
                        }
                        if (data_VaR.Equities_TermSpread_values){
                            plot_data_TermSpread.push([temp_unix_no, Math.round(Number(data_VaR.Equities_TermSpread_values[t_stop]) * 1000) / 10])
                        }
                    }
                    this.lineChartVaREquitiesDrivers = new StockChart(this.lineChartVaREquitiesDriversOptions);
                    this.lineChartVaREquitiesQuantile = new StockChart(this.lineChartVaREquitiesQuantileOptions);
                    this.lineChartVaREquitiesDriversOptions.series = [];
                    this.lineChartVaREquitiesQuantileOptions.series = [];
                    //Setting
                    if(plot_data_CreditTOGDP.length > 0){
                        var entry : any = {
                            name: "Credit-to-GDP",
                            data: plot_data_CreditTOGDP
                        };
                        this.lineChartVaREquitiesDriversOptions.series.push(entry);
                    }
                    if(plot_data_CreditTOGDPNFC.length > 0){
                        var entry : any = {
                            name: "Credit-to-GDP NFC",
                            data: plot_data_CreditTOGDPNFC
                        };
                        this.lineChartVaREquitiesDriversOptions.series.push(entry);
                    }
                    if(plot_data_CreditTOGDPNF.length > 0){
                        var entry : any = {
                            name: "Credit-to-GDP non-financials",
                            data: plot_data_CreditTOGDPNF
                        };
                        this.lineChartVaREquitiesDriversOptions.series.push(entry);
                    }
                    if(plot_data_NPLTOLoans.length > 0){
                        var entry : any = {
                            name: "Nonperforming liabilities to loans",
                            data: plot_data_NPLTOLoans
                        };
                        this.lineChartVaREquitiesDriversOptions.series.push(entry);
                    }
                    if(plot_data_LiquidityAssets.length > 0){
                        var entry : any = {
                            name: "Liquidity of assets",
                            data: plot_data_LiquidityAssets
                        };
                        this.lineChartVaREquitiesDriversOptions.series.push(entry);
                    }
                    if(plot_data_ComRELoans.length > 0){
                        var entry : any = {
                            name: "Com. real estate loans",
                            data: plot_data_ComRELoans
                        };
                        this.lineChartVaREquitiesDriversOptions.series.push(entry);
                    }
                    if(plot_data_ResidRELoans.length > 0){
                        var entry : any = {
                            name: "Residential real estate loans",
                            data: plot_data_ResidRELoans
                        };
                        this.lineChartVaREquitiesDriversOptions.series.push(entry);
                    }
                    if(plot_data_RHousePrice.length > 0){
                        var entry : any = {
                            name: "Residential house prices",
                            data: plot_data_RHousePrice
                        };
                        this.lineChartVaREquitiesDriversOptions.series.push(entry);
                    }
                    if(plot_data_HouPricInc.length > 0){
                        var entry : any = {
                            name: "House price to income",
                            data: plot_data_HouPricInc
                        };
                        this.lineChartVaREquitiesDriversOptions.series.push(entry);
                    }                    
                    if(plot_data_HouPricRent.length > 0){
                        var entry : any = {
                            name: "House price to rent",
                            data: plot_data_HouPricRent
                        };
                        this.lineChartVaREquitiesDriversOptions.series.push(entry);
                    }                    
                    if(plot_data_LongYield.length > 0){
                        var entry : any = {
                            name: "Long yields",
                            data: plot_data_LongYield
                        };
                        this.lineChartVaREquitiesDriversOptions.series.push(entry);
                    }       
                    if(plot_data_ShortYield.length > 0){
                        var entry : any = {
                            name: "Short yields",
                            data: plot_data_ShortYield
                        };
                        this.lineChartVaREquitiesDriversOptions.series.push(entry);
                    }                    
                    if(plot_data_TermSpread.length > 0){
                        var entry : any = {
                            name: "Term spread",
                            data: plot_data_TermSpread
                        };
                        this.lineChartVaREquitiesDriversOptions.series.push(entry);
                    }      
                    //
                    var entry : any = {
                        name: "Tail value",
                        data: plot_data_q10,
                        color: "#009DA0"
                    };
                    this.lineChartVaREquitiesQuantileOptions.series.push(entry);
                    //Setting
                    this.flag_VaREquitiesPLOT = true;
                }
                //
                this.flag_VaR = true;
            }
        }
        );
        */
    }
    
    async pullingGrowthSupplyDemandTri(){
        /*
        //Load scenarions
        var countrySelectedCurve = this.countrySelected;
        if (countrySelectedCurve == "United Kingdom"){
            countrySelectedCurve = "UK";
        }else if (countrySelectedCurve == "United States"){
            countrySelectedCurve = "US";
        }
        this.http.get<Growth_SupplyDemandTri>('https://api.alphahuntsman.com/growthdecomposed/supplydemandTri?country='+countrySelectedCurve).subscribe(
            (data_pulled : Growth_SupplyDemandTri) => {
                if(data_pulled){
                    const plot_data_supply = [];
                    const plot_data_demand = [];
                    const plot_data_longrun = [];
                    for (var t_stop = 1;t_stop < data_pulled.Growth_index.length;t_stop++){
                        let temp_unix = new Date(data_pulled.Growth_index[t_stop]);
                        let temp_unix_no = temp_unix.getTime();
                        plot_data_supply.push([temp_unix_no, Math.round(Number(data_pulled.Growth_supply[t_stop]) * 1000) / 1000])
                        plot_data_demand.push([temp_unix_no, Math.round(Number(data_pulled.Growth_demand[t_stop]) * 1000) / 1000])
                        plot_data_longrun.push([temp_unix_no, Math.round(Number(data_pulled.Growth_longrun[t_stop]) * 1000) / 1000])
                    }
                    //
                    this.lineChartGrowthSupplyDemandTriPlot = new StockChart(this.lineChartGrowthSupplyDemandTriOptions);
                    this.lineChartGrowthSupplyDemandTriOptions.series[0].data = plot_data_supply;
                    this.lineChartGrowthSupplyDemandTriOptions.series[1].data = plot_data_demand;
                    this.lineChartGrowthSupplyDemandTriOptions.series[2].data = plot_data_longrun;
                    this.flagGrowthSupplyTriDemand = true;
                }else{
                    this.flagGrowthSupplyTriDemand = false;
                    //No such country
                }
        });
        */
    }
    
    
    async pullingGrowthSupplyDemand(){
        //Load scenarions
        var countrySelectedCurve = this.countrySelected;
        if (countrySelectedCurve == "United Kingdom"){
            countrySelectedCurve = "UK";
        }else if (countrySelectedCurve == "United States"){
            countrySelectedCurve = "US";
        }
        /*
        this.http.get<Growth_SupplyDemand>('https://api.alphahuntsman.com/growthdecomposed/supplydemand?country='+countrySelectedCurve).subscribe(
            (data_pulled : Growth_SupplyDemand) => {
                if(data_pulled){
                    const plot_data_supply = [];
                    const plot_data_demand = [];
                    const plot_data_actual = [];
                    for (var t_stop = 1;t_stop < data_pulled.Growth_index.length;t_stop++){
                        let temp_unix = new Date(data_pulled.Growth_index[t_stop]);
                        let temp_unix_no = temp_unix.getTime();
                        plot_data_supply.push([temp_unix_no, Math.round(Number(data_pulled.Growth_supply[t_stop]) * 1000) / 1000])
                        plot_data_demand.push([temp_unix_no, Math.round(Number(data_pulled.Growth_demand[t_stop]) * 1000) / 1000])
                        plot_data_actual.push([temp_unix_no, Math.round(Number(data_pulled.Growth_actual[t_stop]) * 1000) / 1000])
                    }
                    //
                    this.lineChartGrowthSupplyDemandPlot = new StockChart(this.lineChartGrowthSupplyDemandOptions);
                    this.lineChartGrowthSupplyDemandOptions.series[0].data = plot_data_supply;
                    this.lineChartGrowthSupplyDemandOptions.series[1].data = plot_data_demand;
                    this.lineChartGrowthSupplyDemandOptions.series[2].data = plot_data_actual;
                    this.flagGrowthSupplyDemand = true;
                }else{
                    this.flagGrowthSupplyDemand = false;
                    //No such country
                }
        });
        */
    }
    
    async pullingCurveData(){
        /*
        //Get tenors
        var countrySelectedCurve = this.countrySelected;
        if (countrySelectedCurve == "United Kingdom"){
            countrySelectedCurve = "UK";
        }else if (countrySelectedCurve == "United States"){
            countrySelectedCurve = "US";
        }else if (countrySelectedCurve == "EA"){
            countrySelectedCurve = "Euro Area";
        }
        //Load scenarions
        this.http.get<string[]>('https://api.alphahuntsman.com/chronos/tenors?country='+countrySelectedCurve+'&scenario='+this.selectedScenario).subscribe((data_tenors: string[]) => {
            this.tenorList = new Array<string>();
            for(var t_stop of data_tenors){
                this.tenorList.push(t_stop);
            }
            //Plot data
            this.http.get<Curve_Data[]>('https://api.alphahuntsman.com/chronos?country='+countrySelectedCurve+'&scenario='+this.selectedScenario)
             .subscribe((data_details: Curve_Data[]) => {
                //Get timepoints
                this.timepointList = new Array<string>();
                for (var t_stop of data_details){
                    if(!this.timepointList.includes(t_stop.time)){
                        this.timepointList.push(t_stop.time);
                    }
                    //this.refreshDate = t_stop.updatedDate;
                    //this.refreshDate_next = t_stop.updatedDate_next;
                }
                this.timepointList = this.timepointList.sort();
                this.currentTimepoint = this.timepointList[0];
                this.selectedTimepoint = this.timepointList[1];
                this.timepointList = this.timepointList.slice(1);
                //Select loaded data
                this.pulledCurvedData = data_details;
                //
                if(this.tenorList.length < 1){
                    this.curvePlotFlag = false;
                }else{
                    this.plottingSelectedCurve();
                }
            });
        });
        */
    }
    
    //
    plottingSelectedCurve(){
        /*
        var curve_data_now = this.pulledCurvedData.filter(stop => stop.time == this.currentTimepoint);
        var curve_data_next = this.pulledCurvedData.filter(stop => stop.time == this.selectedTimepoint);
        //Sort by tenors
        curve_data_now = curve_data_now.sort(function(a, b) {
            return a.tenor - b.tenor;
        });
        curve_data_next = curve_data_next.sort(function(a, b) {
            return a.tenor - b.tenor;
        });
        var curve_data_now_final = [];
        for(var t_inner of curve_data_now){
            curve_data_now_final.push(t_inner.value)
        }
        var curve_data_next_final = [];
        for(var t_inner of curve_data_next){
            curve_data_next_final.push(t_inner.value)
        }
        this.curvePlotOptions.series[0].data = curve_data_now_final;
        this.curvePlotOptions.series[1].data = curve_data_next_final;
        this.curvePlot = new Chart(this.curvePlotOptions);
        this.curvePlotFlag = true;
        window.dispatchEvent(new Event('resize'));
        */
    }
    //modalService
    //content
    //title
}