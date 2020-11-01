import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { Chart } from 'angular-highcharts';
import { LocalDataSource } from 'ng2-smart-table';

import { InstrumentSpecs } from './instrumentSpecsModel';
import { InstrumentResults } from './instrumentResultsModel';
import { InstrumentResultsCashflow } from './instrumentResultsCashflowModel';
import { InstrumentResultsKRDs } from './instrumentResultsKRDsModel';
import { instrumentResultsDetails } from './instrumentResultsDetailsModel';

import { UserModel } from '../shared/auth/userModel';
import { AuthService } from '../shared/auth/auth.service';

export interface Curve_Data{
    country: string;
    scenario: string;
    time: string;
    tenor : number;
    value : number;    
    updatedDate: string;
    updatedDate_next: string;
};

@Component({
  selector: 'app-chronos',
  templateUrl: './chronos.component.html',
  styleUrls: ['./chronos.component.scss']
})

export class ChronosComponent implements OnInit{
    
    //User details
    currentUser: UserModel;
    flag_InstrumentForm : any;
    
    @ViewChild('f', {static: false}) pricingInstrumentForm: NgForm;
    pricingInstrumentFormID :any;
    
    requestDataTable : LocalDataSource;
    requestDataTableSettings = {
      columns: {
        pricing_instrument_name: {
          title: 'Name',
          filter: false,
        },
        pricing_instrument_coupon_rate: {
          title: 'Coupon',
          filter: false,
        },
        pricing_instrument_calendar_type: {
          title: 'Country',
          filter: false,
        },
        pricing_instrument_scenario: {
          title: 'Pricing scenario',
          filter: false,
        },
        pricing_instrument_future_point: {
          title: 'Scenario timepoint',
          filter: false,
        },
        instrument_status: {
          title: 'Status',
          filter: false,
        },
        instrument_last_run: {
          title: 'Last run',
          filter: false,
        },
        instrument_NPV: {
          title: 'NPV',
          filter: false,
        }
      },
      attr: {
        class: "table table-responsive"
      },
      actions: {
        add: false,
        edit: false,
        custom: [
          { 
            name: 'onRunPricing', 
            title: '<i class="icon-graph info font-medium-1 mr-2"></i>' 
          },
          {
            name: 'onEdit', 
            title: '<i class="ft-edit-2 info font-medium-1 mr-2"></i>'
    
          }],
      },
      hideSubHeader: true,
      delete:{
        confirmDelete: true,
        deleteButtonContent: '<i class="ft-x danger font-medium-1 mr-2"></i>'
      }
    };
    
    requestDataTableData : InstrumentSpecs[];

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
    //Country list
    countryList: string[];
    countryListPricing: string[];
    countrySelected : string = "US";
    countrySelectedPricing : string = "US";
    countrySelectorDrop(newSortOrder: string){ 
      this.countrySelected = newSortOrder;
      this.countrySelectedPricing = this.countrySelected;
      this.pullingCurveData();
    }
    //Scenario list  
    selectedScenario: string= "Baseline";
    scenarioList: string[];
    scenarioListPricing : string[];
    selectedScenarioTemp : string = "";
    scenarioSelectorDrop(newSortOrder: string){
      this.selectedScenario = newSortOrder;
      this.selectedScenarioTemp = this.selectedScenario;
      this.pullingCurveData();
    }
    
    //Time point list  
    currentTimepoint: string= "2020-01-01";
    selectedTimepoint: string= "2020-03-01";
    timepointList: string[];
    timepointSelectorDrop(newSortOrder: string){
      this.selectedTimepoint = newSortOrder;
      this.plottingSelectedCurve();
    }
    
    //Tenors
    tenorList: string[];
    pulledCurvedData: Curve_Data[];
    
    refreshDate : string = "2001-01-01";
    refreshDate_next : string = "2001-01-08";
    
    //Pricing engine status
    flag_pricing_online : any;
    
    constructor(
        private modalService: NgbModal,
        private http: HttpClient,
        private router: Router,
        private authenticationService: AuthService
    ) {
      //
      this.authenticationService.doPing();
      if (!this.authenticationService.currentUserValue) {
        this.flag_InstrumentForm = false;
      }else{
        this.currentUser = this.authenticationService.currentUserValue;
        this.flag_InstrumentForm = true;
      }
      this.temp_flat_yield_hax = 0;
      //dropdowns
      this.selectedScenarioTemp = this.selectedScenario;  
      this.countrySelectedPricing = this.countrySelected;
      //Plots
      this.curvePlotFlag = false;
      //Load scenarions
      this.http.get<string[]>('https://api.alphahuntsman.com/chronos/scenarios').subscribe((data_scenarions: string[]) => {
        this.scenarioList = new Array<string>();
        this.scenarioListPricing = new Array<string>();
        for(var t_stop of data_scenarions){
            this.scenarioList.push(t_stop);
            this.scenarioListPricing.push(t_stop);
        }
        this.scenarioList = this.scenarioList.sort();
        this.scenarioListPricing = this.scenarioListPricing.sort();
        this.scenarioListPricing.push("Current");
        this.selectedScenario = this.scenarioList[0];
      });
      //Load countries
      this.http.get<string[]>('https://api.alphahuntsman.com/chronos/countries').subscribe((data_countries: string[]) => {
        this.countryList = new Array<string>();
        this.countryListPricing = new Array<string>();
        for(var t_stop of data_countries){
            this.countryList.push(t_stop);
        }
        this.countryList = this.countryList.sort();
        this.countryListPricing = this.countryListPricing.sort();
        this.countryListPricing.push("Flat");
        for(var t_stop of this.countryList){
            this.countryListPricing.push(t_stop);
        }
        this.countrySelected = this.countryList[0];
        this.countrySelectedPricing = this.countrySelected;
        //Pull data
        this.pullingCurveData()
      });
      //Refresh
      this.refreshTableData();
      //Pricing engine status
      this.refreshPricingEngine();
    }
    
    ngOnInit() {
        this.flag_pricing_online = false;
    }
    
    refreshPricingEngine(){
        if (this.authenticationService.currentUserValue) {
            //Pull data
            this.http.get<string[]>('https://api.alphahuntsman.com/monitor/status').subscribe((data_results: string[]) => {
                if(parseInt(data_results[0]['chronos_last_status']) < 2){
                    this.flag_pricing_online = true;
                }else{
                    this.flag_pricing_online = false;
                }
          });
        }
    }
    
    refreshTableData(){
        this.authenticationService.doPing();
        this.refreshPricingEngine();
        if (this.authenticationService.currentUserValue) {
          //Pull data
          this.http.get<InstrumentSpecs[]>('https://api.alphahuntsman.com/chronos/instruments?ID=' + this.currentUser.tempAPI).subscribe((data_instruments: InstrumentSpecs[]) => {
              this.requestDataTableData = new Array<InstrumentSpecs>();
              for(var t_stop of data_instruments){
                  this.requestDataTableData.push(t_stop);
              }
              //Table data
              this.requestDataTable = new LocalDataSource(this.requestDataTableData);
              this.pricingInstrumentFormID = null;
          });
       }
    }
    
    pullingCurveData(){
        //Get tenors
        //Load scenarions
        console.log('https://api.alphahuntsman.com/chronos/tenors?country='+this.countrySelected+'&scenario='+this.selectedScenario);
        this.http.get<string[]>('https://api.alphahuntsman.com/chronos/tenors?country='+this.countrySelected+'&scenario='+this.selectedScenario).subscribe((data_tenors: string[]) => {
            this.tenorList = new Array<string>();
            for(var t_stop of data_tenors){
                this.tenorList.push(t_stop);
            }
            
            //Plot data
            this.http.get<Curve_Data[]>('https://api.alphahuntsman.com/chronos?country='+this.countrySelected+'&scenario='+this.selectedScenario)
             .subscribe((data_details: Curve_Data[]) => {
                //Get timepoints
                this.timepointList = new Array<string>();
                for (var t_stop of data_details){
                    if(!this.timepointList.includes(t_stop.time)){
                        this.timepointList.push(t_stop.time);
                    }
                    this.refreshDate = t_stop.updatedDate;
                    this.refreshDate_next = t_stop.updatedDate_next;
                }
                this.timepointList = this.timepointList.sort();
                this.currentTimepoint = this.timepointList[0];
                this.selectedTimepoint = this.timepointList[1];
                this.timepointList = this.timepointList.slice(1);
                //Select loaded data
                this.pulledCurvedData = data_details;
                this.plottingSelectedCurve();
            });
        });
    }
    
    plottingSelectedCurve(){
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
    }
    
    //Create instrument actions
    onInstrumentCreate(){
        var tempInstrumentSpec = new InstrumentSpecs();
        if(this.pricingInstrumentFormID){
            tempInstrumentSpec.id = this.pricingInstrumentFormID;
        }else{
            tempInstrumentSpec.id = "None";
        }
        
        tempInstrumentSpec.userID = this.currentUser.username;
        //Specs
        tempInstrumentSpec.pricing_instrument_name = this.pricingInstrumentForm.controls["pricing_instrument_name"].value;
        tempInstrumentSpec.pricing_instrument_type = this.pricingInstrumentForm.controls["pricing_instrument_type"].value;
        //Issue date
        var temp_date = this.pricingInstrumentForm.controls["pricing_instrument_issue_date"].value;
        var temp_date_formatted = temp_date.year + "-" + temp_date.month + "-" + temp_date.day;
        tempInstrumentSpec.pricing_instrument_issue_date = temp_date_formatted;
        //Maturity
        var temp_date = this.pricingInstrumentForm.controls["pricing_instrument_maturity_date"].value;
        var temp_date_formatted = temp_date.year + "-" + temp_date.month + "-" + temp_date.day;
        tempInstrumentSpec.pricing_instrument_maturity_date = temp_date_formatted;
        //Coupon
        tempInstrumentSpec.pricing_instrument_coupon_rate = this.pricingInstrumentForm.controls["pricing_instrument_coupon_rate"].value;
        //Coupon pereiodicity
        tempInstrumentSpec.pricing_instrument_coupon_type = this.pricingInstrumentForm.controls["pricing_instrument_coupon_type"].value;
        //Calendar type
        tempInstrumentSpec.pricing_instrument_calendar_type = this.pricingInstrumentForm.controls["pricing_instrument_calendar_type"].value;
        //Day convention
        tempInstrumentSpec.pricing_instrument_business_day_count = this.pricingInstrumentForm.controls["pricing_instrument_business_day_count"].value;
        //Business day convention
        tempInstrumentSpec.pricing_instrument_business_day_conv = this.pricingInstrumentForm.controls["pricing_instrument_business_day_conv"].value;
        //Face value
        tempInstrumentSpec.pricing_instrument_facevalue = this.pricingInstrumentForm.controls["pricing_instrument_facevalue"].value;
        //Sov curve
        tempInstrumentSpec.pricing_instrument_sov_curve = this.pricingInstrumentForm.controls["pricing_instrument_sov_curve"].value;
        if(tempInstrumentSpec.pricing_instrument_sov_curve == "Flat"){
            tempInstrumentSpec.pricing_instrument_flat_yield = this.pricingInstrumentForm.controls["pricing_instrument_flat_yield"].value;
        }else{
            tempInstrumentSpec.pricing_instrument_flat_yield = 0;
        }
        //Scenario
        tempInstrumentSpec.pricing_instrument_scenario = this.pricingInstrumentForm.controls["pricing_instrument_scenario"].value;
        if(tempInstrumentSpec.pricing_instrument_scenario == "Current"){
            tempInstrumentSpec.pricing_instrument_future_point = this.pricingInstrumentForm.controls["pricing_instrument_future_point"].value;
        }else{
            tempInstrumentSpec.pricing_instrument_future_point = this.currentTimepoint;
        }
        //Time
        //Additiona spread
        tempInstrumentSpec.pricing_instrument_credit_spread = this.pricingInstrumentForm.controls["pricing_instrument_credit_spread"].value;
        //Status
        tempInstrumentSpec.instrument_status = "Pending";
        //Last run
        tempInstrumentSpec.instrument_last_run = "";
        //NPV
        tempInstrumentSpec.instrument_NPV = 0;
        //
        //Data
        //
        //Update or create
        return this.http.post('https://api.alphahuntsman.com/chronos/instruments', tempInstrumentSpec)
          .subscribe(resp => {
            this.pricingInstrumentForm.reset();
            this.refreshTableData();
        });
    }
    
    //Table actions
    deleteRecord(event){
        if (window.confirm('Are you sure you want to delete?')) {
            event.confirm.resolve();
            var tempInstrumentSpec = new InstrumentSpecs();
            tempInstrumentSpec.userID = this.currentUser.username;
            tempInstrumentSpec.id = event.data['instrumentID'];
            this.http.post('https://api.alphahuntsman.com/chronos/instruments/drop', tempInstrumentSpec)
              .subscribe(resp => {
                this.refreshTableData();
            });
        }else {
            event.confirm.reject();
        }
    }
    
    onCustomEvent(event){
        switch ( event.action) {
            case 'onRunPricing':
              this.onRunPricing(event);
              break;
            case 'onEdit':
              this.onRunEdit(event);
        }
    }
        
    onRunPricing(event){
        var tempInstrumentSpec = new InstrumentSpecs();
        tempInstrumentSpec.userID = this.currentUser.username;
        tempInstrumentSpec.id = event.data['instrumentID'];
        this.http.post('https://api.alphahuntsman.com/chronos/instruments/reset', tempInstrumentSpec)
          .subscribe(resp => {
            this.refreshTableData();
        });
    }
    
    modalTitle : string;
    modalInstrumentResults : InstrumentResults;
    modalInstrumentSpecs : InstrumentSpecs;
    modalCashflowsData : InstrumentResultsCashflow[];
    modalCashflowsKRDsData : InstrumentResultsKRDs[];
    modalCashflowsDetailsData : instrumentResultsDetails[];
    
    modalCashflowsDetailsAmount : string[];
    modalCashflowsDetailsTime : string[];
    modalCashflowsDetailsDiscountRate : string[];
    modalCashflowsDetailsDiscountCSUM : string[];
    modalCashflowsDetailsDiscountAmount : string[];
    //
    onUserSelectRow(event, content) {
        //
        this.modalInstrumentSpecs = event.data;
        this.modalInstrumentResults = null;
        this.http.get<InstrumentResults>('https://api.alphahuntsman.com/chronos/results?ID=' + this.currentUser.tempAPI+"&runID="+this.modalInstrumentSpecs["_id"]).subscribe((data_instruments: InstrumentResults) => {
            this.modalInstrumentResults = data_instruments;
            //reset
            this.modalCashflowsData = new Array<InstrumentResultsCashflow>();
            //Date, flow, discount
            for(var t_stop_idx in this.modalInstrumentResults.Cashflows){
                var t_stop = this.modalInstrumentResults.Cashflows[t_stop_idx];
                var t_entry = new InstrumentResultsCashflow();
                var temp_data = t_stop.split("|");
                t_entry.date = temp_data[0]
                t_entry.flow = parseFloat(temp_data[1]);
                t_entry.discount = parseFloat(temp_data[2]);
                this.modalCashflowsData.push(t_entry);
            }
            //Tenor, values
            this.modalCashflowsKRDsData = new Array<InstrumentResultsKRDs>();
            for(var t_stop_idx in this.modalInstrumentResults.KRDs){
                var t_stop = this.modalInstrumentResults.KRDs[t_stop_idx];
                var t_entry2 = new InstrumentResultsKRDs();
                var temp_data = t_stop.split("|");
                t_entry2.tenor = temp_data[0];
                t_entry2.value = parseFloat(temp_data[1]);
                this.modalCashflowsKRDsData.push(t_entry2);
            }
            //
            this.modalCashflowsDetailsData = new Array<instrumentResultsDetails>();
            //amount, date, discount rate, discount csum, discount amount
            for(var t_stop_idx in this.modalInstrumentResults.Details){
                var t_stop = this.modalInstrumentResults.Details[t_stop_idx];
                var t_entry3 = new instrumentResultsDetails();
                var temp_data = t_stop.split("|");
                t_entry3.date = parseFloat(temp_data[1]);
                t_entry3.amount = parseFloat(temp_data[0]);
                t_entry3.discountRate = parseFloat(temp_data[2]);
                t_entry3.discountCSUM = parseFloat(temp_data[3]);
                t_entry3.discountAmount = parseFloat(temp_data[4]);
                this.modalCashflowsDetailsData.push(t_entry3);
            }
            //var selectedRows = event.selected;
            this.modalTitle = " Pricing report for " + this.modalInstrumentSpecs['pricing_instrument_name'];
            this.modalService.open(content, {windowClass : "ChronoDetails"}).result.then((result) => {      
                }, (reason) => {     
            });
        });
    }

    temp_flat_yield_hax : any;
    onRunEdit(event){
        //Set data
        this.pricingInstrumentForm.controls["pricing_instrument_name"].setValue(event.data['pricing_instrument_name']);
        this.pricingInstrumentForm.controls["pricing_instrument_type"].setValue(event.data['pricing_instrument_type']);
        //Issue date
        var t_time = event.data['pricing_instrument_issue_date'];
        var t_time_array = t_time.split("-");
        this.pricingInstrumentForm.controls["pricing_instrument_issue_date"].setValue({
            year : parseInt(t_time_array[0],10),
            month : parseInt(t_time_array[1],10),
            day : parseInt(t_time_array[2],10)
        });
        //Maturity date
        var t_time = event.data['pricing_instrument_maturity_date'];
        var t_time_array = t_time.split("-");
        this.pricingInstrumentForm.controls["pricing_instrument_maturity_date"].setValue({
            year : parseInt(t_time_array[0],10),
            month : parseInt(t_time_array[1],10),
            day : parseInt(t_time_array[2],10)
        });
        this.pricingInstrumentForm.controls["pricing_instrument_coupon_rate"].setValue(event.data['pricing_instrument_coupon_rate']);
        this.pricingInstrumentForm.controls["pricing_instrument_coupon_type"].setValue(event.data['pricing_instrument_coupon_type']);
        this.pricingInstrumentForm.controls["pricing_instrument_calendar_type"].setValue(event.data['pricing_instrument_calendar_type']);
        this.pricingInstrumentForm.controls["pricing_instrument_business_day_count"].setValue(event.data['pricing_instrument_business_day_count']);
        this.pricingInstrumentForm.controls["pricing_instrument_business_day_conv"].setValue(event.data['pricing_instrument_business_day_conv']);
        this.pricingInstrumentForm.controls["pricing_instrument_facevalue"].setValue(event.data['pricing_instrument_facevalue']);
        this.pricingInstrumentForm.controls["pricing_instrument_sov_curve"].setValue(event.data['pricing_instrument_sov_curve']);
        this.pricingInstrumentForm.controls["pricing_instrument_scenario"].setValue(event.data['pricing_instrument_scenario']);
        this.selectedScenarioTemp = event.data['pricing_instrument_sov_curve'];
        this.countrySelectedPricing = event.data['pricing_instrument_sov_curve'];
        if (this.selectedScenarioTemp == "Current"){
            this.pricingInstrumentForm.controls["pricing_instrument_future_point"].setValue(event.data['pricing_instrument_future_point'], {onlySelf: true});
        }
        
        if (this.countrySelectedPricing == "Flat"){
            this.temp_flat_yield_hax = parseFloat(event.data['pricing_instrument_flat_yield']);
        }
        this.pricingInstrumentForm.controls["pricing_instrument_credit_spread"].setValue(event.data['pricing_instrument_credit_spread']);
        //Setting default values
        this.selectedTimepoint = event.data['pricing_instrument_future_point'];
        this.selectedScenario = event.data['pricing_instrument_scenario'];
        this.countrySelected = event.data['pricing_instrument_sov_curve'];
        
        //
        this.pricingInstrumentFormID = event.data['instrumentID'];
    }
    
    //On country change
    onChangeScenario(event){
        this.selectedScenarioTemp = this.pricingInstrumentForm.controls["pricing_instrument_scenario"].value;
    }
    
    //On change curve
    onChangeCurve(event){
        this.countrySelectedPricing = this.pricingInstrumentForm.controls["pricing_instrument_sov_curve"].value;
    }
}
