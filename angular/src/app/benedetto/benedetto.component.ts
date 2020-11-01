import { Component , NgZone} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import 'rxjs/add/operator/map'

import { MapChart } from 'angular-highcharts';
import { Chart } from 'angular-highcharts';
import { StockChart } from 'angular-highcharts';

@Component({
    selector: 'app-bendetto',
    templateUrl: './bendetto.component.html',
    styleUrls: ['./bendetto.component.scss']
})


export class BenedettoComponent {
    
//    currentCountryDetailsQoQ : Economic_Series[];
//    currentCountryDetailsYoY : Economic_Series[];
    
    refreshDate: any;
    refreshDate_next: any;

    //
    constructor(
        private http: HttpClient, 
        private modalService: NgbModal,
        private router: Router
        ) { 
    }

    //Dropdown selector
    selectedScenario: any;
    scenarionList: string[];
    scenarioSelectorDrop(newSortOrder: string){
        this.selectedScenario = newSortOrder;
        //this.countrySelectorDrop(this.countrySelected);
    }    

    ngOnInit(){
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
    }
    
//    modal_data_mean : Economic_Series_Timepoints[];
//    modal_data_upper : Economic_Series_Timepoints[];
//    modal_data_lower : Economic_Series_Timepoints[];
    
    //Modal details
    title: string;
    GetDetails(content, t_variable, data_format) {
        /*
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
                this.title = t_variable + " " + data_format;
                this.modalService.open(content, {windowClass : "atlasIndexPlot"}).result.then((result) => {      
                    }, (reason) => {     
                });
             });
        */
    }
}