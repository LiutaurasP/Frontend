import { Component , NgZone} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import 'rxjs/add/operator/map'

import { MapChart } from 'angular-highcharts';
import { Chart } from 'angular-highcharts';
import { StockChart } from 'angular-highcharts';

export interface World_Map_Entry{
    country: string;
    country_code: string;
    updatedDate: string;
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

declare var require: any;
const worldMap = require('@highcharts/map-collection/custom/world.geo.json');


@Component({
    selector: 'app-atlas',
    templateUrl: './atlas.component.html',
    styleUrls: ['./atlas.component.scss']
})


export class AtlasComponent {
    
    currentCountryDetailsQoQ : Economic_Series;
    currentCountryDetailsYoY : Economic_Series;
    
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
            min: 0
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
            chart: {
                height: (9 / 16 * 100) + '%' // 16:9 ratio
            },
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
                shared: true
            },

            legend: {
                enabled: false
            },

            series: [{
                name: 'Growth',
                color: "#000000",
                data: []
            }, {
                name: 'Lower',
                color: "#009DA0",
                data: []
            },{
                name: 'Upper',
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
    
    constructor(private http: HttpClient, private modalService: NgbModal) { 
    }
    

    selectedScenario: any;
    refreshDate: any;

    ngOnInit(){
        this.selectedScenario = "Baseline";
        //Load world map data
        this.http.get<World_Map_Entry[]>('https://api.alphahuntsman.com/atlas/world?scenario='+this.selectedScenario)
            .subscribe((data_details: World_Map_Entry[]) => {
                var temp_min = 0;
                var temp_max = 10;
                this.countryList = new Array<string>();
                for(var t_stop of data_details){
                    this.countryList.push(t_stop.country);
                    this.refreshDate = t_stop.updatedDate;
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
            });
    }
    
    countryList: string[];
    countrySelected : string = "World"
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
                    this.currentCountryDetailsQoQ = {
                        last_updated : new Date(qoq_data.last_update).toISOString().slice(0,10),
                        series_name: t_name,
                        series_format: qoq_data.series_format,
                        series: new Array<Economic_Series_Values>()
                    };
                }
                if(!this.currentCountryDetailsYoY && yoy_data){
                    this.currentCountryDetailsYoY = {
                        last_updated : new Date(yoy_data.last_update).toISOString().slice(0,10),
                        series_name: t_name,
                        series_format: yoy_data.series_format,
                        series: new Array<Economic_Series_Values>()
                    };
                }
                if(qoq_data){
                    this.currentCountryDetailsQoQ.series.push(qoq_data);
                }
                if(yoy_data){
                    this.currentCountryDetailsYoY.series.push(yoy_data);
                }
            }
         });
    
        //factor data
        //Refresh country details
        this.countrySelected = newSortOrder;
        //Setting details
        let country_name = this.worldMapData.filter(stop => stop.country == newSortOrder)[0].country_code;
        this.flag_factors = false;
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
        //Setting indice data
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
        console.log('https://api.alphahuntsman.com/atlas/series?country='+this.countrySelected+"&variable="+t_variable+"&format="+data_format+'&scenario='+this.selectedScenario);
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
                    if(data_format == "QoQ"){
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
                    if(data_format == "QoQ"){
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
                    if(data_format == "QoQ"){
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
                //Final model activation
                this.title = t_variable + " " + data_format;
                this.modalService.open(content, {windowClass : "atlasIndexPlot"}).result.then((result) => {      
                    }, (reason) => {     
                });
             });
    }
}