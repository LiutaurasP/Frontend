import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService } from '@ngx-translate/core';

import { UserModel } from '../shared/auth/userModel';
import { AuthService } from '../shared/auth/auth.service';

import { Chart } from 'angular-highcharts';
import { StockChart } from 'angular-highcharts';

import { BenedettoResults } from './benedettoResultsModel';
import { BenedettoSeriesModel } from './benedettoSeriesModel';

export interface Economic_Series_Timepoints{
    measure: string;
    country: string;
    variable: string;
    format: string;
    time: string;
    value: number;
};

@Component({
  selector: 'app-benedetto',
  templateUrl: './benedetto.component.html',
  styleUrls: ['./benedetto.component.scss']
})

export class BenedettoComponent implements OnInit{
    //
    //Country list
    countryClassSelected: string= "US";
    countryList: string[];
    countryClassSelectorDrop(newSortOrder: string){
      this.countryClassSelected = newSortOrder;
      this.pullStats();
    }
    
    //Scenario list  
    selectedScenario: string= "Baseline";
    scenarioList: string[];
    scenarioSelectorDrop(newSortOrder: string){
      this.selectedScenario = newSortOrder;
      this.pullCountries();
    }
    
    tableData : BenedettoResults[];
    flagTable : any;
    //Modal
    flaglineChart : any;
    lineChart : any;
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
            }
            ]
    };

    constructor(private modalService: NgbModal,
                private http: HttpClient,
                private router: Router,
                private authenticationService: AuthService,
                private readonly translate: TranslateService) {
        translate.setDefaultLang('en');
        this.flagTable = false;
        this.flaglineChart = false;
        //Load scenarios
        this.http.get<string[]>('https://api.alphahuntsman.com/benedetto/scenarios').subscribe((data_scenarions: string[]) => {
        this.scenarioList = new Array<string>();
        for(var t_stop of data_scenarions){
            this.scenarioList.push(t_stop);
        }
        this.scenarioList = this.scenarioList.sort();
        this.selectedScenario = this.scenarioList[0];
        this.pullCountries();
      });
    }
    
    pullCountries(){
        this.http.get<string[]>('https://api.alphahuntsman.com/benedetto/countries').subscribe((data_countries: string[]) => {
            this.countryList = new Array<string>();
            for(var t_stop of data_countries){
                this.countryList.push(t_stop.replace("_"," "));
            }
            this.countryList = this.countryList.sort();
            this.countryClassSelected = this.countryList[0];
            this.pullStats();
        });
    }
    
    pullStats(){
        this.http.get<BenedettoResults[]>('https://api.alphahuntsman.com/benedetto/stats?country=' + this.countryClassSelected + '&scenario=' + this.selectedScenario).subscribe((data_stats: BenedettoResults[]) => {
            this.tableData = data_stats;
            this.flagTable = true;
        });
    }
    
    //Modal details
    title: string;
    GetDetails(content, t_measure, t_category, t_sector) {
        this.http.get<BenedettoSeriesModel[]>('https://api.alphahuntsman.com/benedetto/series?country=' + this.countryClassSelected 
                                + '&scenario=' + this.selectedScenario + '&category=' + t_category + '&measure=' + t_measure + '&sector=' + t_sector)
             .subscribe((data_details: BenedettoSeriesModel[]) => {
                    this.flaglineChart = false;
                    //Sort to plot
                    const lineplot_data_mean = [];
                    for(var t_idx = 0; t_idx < data_details[0].series_values.length; t_idx++){
                        let temp_unix = new Date(data_details[0].series_index[t_idx]);
                        let temp_unix_no = temp_unix.getTime();
                        let temp_entry = Number(data_details[0].series_values[t_idx]);
                        lineplot_data_mean.push([temp_unix_no, Math.round(temp_entry * 1000) / 1000])
                    }
                    this.lineOptions.series[0].data = lineplot_data_mean;
                    this.lineChart = new StockChart(this.lineOptions);
                    this.flaglineChart = true;
                    window.dispatchEvent(new Event('resize'));
                    //Final model activation
                    let measure: string;
                    let category: string;
                    this.translate.get('BENEDETTO.measure_types.' + t_measure).subscribe(result => measure = result);
                    this.translate.get('BENEDETTO.category_types.' + t_category).subscribe(result => category = result);
                    this.translate.get('BENEDETTO.sector_types.' + t_sector).subscribe(result => {
                        this.title = `${measure} ${category} ${result}`;
                    });
                    // this.title = t_measure + " " + t_category + " " + t_sector;
                    this.modalService.open(content, {windowClass : "atlasIndexPlot"}).result.then((result) => {      
                        }, (reason) => {     
                    });
             });
    }
    
    ngOnInit() {
    }
}
