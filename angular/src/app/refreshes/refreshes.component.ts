import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { LocalDataSource } from 'ng2-smart-table';

import { UserModel } from '../shared/auth/userModel';
import { AuthService } from '../shared/auth/auth.service';

import { Chart } from 'angular-highcharts';
import { StockChart } from 'angular-highcharts';

import { RefreshesResults } from './refreshesResultsModel';
import { InputsEntries, InputsEntriesGroups, InputsOutlook, InputsKey, InputFX } from './refreshes.inputs.model';


@Component({
  selector: 'app-refreshes',
  templateUrl: './refreshes.component.html',
  styleUrls: ['./refreshes.component.scss']
})

export class RefreshesComponent implements OnInit{
    //
    //Country list
    countryClassSelected: string= "US";
    countryList: string[];
    countryClassSelectorDrop(newSortOrder: string){
      this.countryClassSelected = newSortOrder;
      this.pullStats();
    }
    
    lastRefreshDate;
    //
    tableDataInputs : any;
    flagTableInputs : any;
    //Table growth cons
    tableDataInputsGrowCons : any;
    flagTableInputsGrowCons : any;
    //Table growth mfg
    tableDataInputsGrowMfg : any;
    flagTableInputsGrowMfg : any;
    //Table growth trade
    tableDataInputsGrowTrade : any;
    flagTableInputsGrowTrade : any;
    //Table inflation cons
    tableDataInputsInfCons : any;
    flagTableInputsInfCons : any;
    //Table inflation mfg
    tableDataInputsInfMfg : any;
    flagTableInputsInfMfg : any;
    //Table inflation trade
    tableDataInputsInfTrade : any;
    flagTableInputsInfTrade : any;
    //
    //Outlook
    tableFactorsOutlookBase : any;
    flagTableFactorsOutlookBase : any;
    tableFactorsOutlookCons : any;
    flagTableFactorsOutlookCons : any;
    //
    tableKeyOutlookBase : any;
    flagTableKeyOutlookBase : any;
    tableKeyOutlookCons : any;
    flagTableKeyOutlookCons : any;
    //FX
    tableFXData : any;
    flagTableFXData : any;
    //Term
    tableTermData : any;
    flagTableTermData : any;
    //Tail growth
    tableTailGrowthData : any;
    flagTableTailGrowthData : any;
    //Tail CPI
    tableTailCPIData : any;
    flagTableTailCPIData : any;
    //Tail Equity
    tableTailEquityData : any;
    flagTableTailEquityData : any;
    //
    //Income
    //
    //1
    tableIncomeData1 : any;
    flagTableIncomeData1 : any;
    tableIncomeName1: any;
    //2
    tableIncomeData2 : any;
    flagTableIncomeData2 : any;
    tableIncomeName2: any;
    //3
    tableIncomeData3 : any;
    flagTableIncomeData3 : any;
    tableIncomeName3: any;
    //4
    tableIncomeData4 : any;
    flagTableIncomeData4 : any;
    tableIncomeName4: any;
    //5
    tableIncomeData5 : any;
    flagTableIncomeData5 : any;
    tableIncomeName5: any;
    //6
    tableIncomeData6 : any;
    flagTableIncomeData6 : any;
    tableIncomeName6: any;
    //7
    tableIncomeData7 : any;
    flagTableIncomeData7 : any;
    tableIncomeName7: any;
    //8
    tableIncomeData8 : any;
    flagTableIncomeData8 : any;
    tableIncomeName8: any;
    //
    //
    //
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

    constructor(
        private http: HttpClient,
        private router: Router,
        private authenticationService: AuthService
    ) {
        this.flagTableInputs = false;
        this.flagTableInputsGrowCons = false;
        this.flagTableInputsGrowMfg = false;
        this.flagTableInputsGrowTrade = false;
        this.flagTableInputsInfCons = false;
        this.flagTableInputsInfMfg = false;
        this.flagTableInputsInfTrade = false;
        //
        this.flagTableFactorsOutlookBase = false;
        this.flagTableFactorsOutlookCons = false;
        //
        this.flagTableKeyOutlookBase = false;
        this.flagTableKeyOutlookCons = false;
        //
        this.flagTableFXData = false;
        //
        this.flagTableTermData = false;
        //
        this.flagTableTailGrowthData = false;
        this.flagTableTailCPIData = false;
        this.flagTableTailEquityData = false;
        //
        this.flagTableIncomeData1 = false;
        this.flagTableIncomeData2 = false;
        this.flagTableIncomeData3 = false;
        this.flagTableIncomeData4 = false;
        this.flagTableIncomeData5 = false;
        this.flagTableIncomeData6 = false;
        this.flagTableIncomeData7 = false;
        this.flagTableIncomeData8 = false;
        //Load scenarios
        this.pullCountries();
    }
    
    pullCountries(){
        this.http.get<string[]>('https://api.alphahuntsman.com/refreshes/countries').subscribe((data_countries: string[]) => {
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
        
        this.http.get<RefreshesResults[]>('https://api.alphahuntsman.com/refreshes/stats?country=' + this.countryClassSelected).subscribe((data_stats: RefreshesResults[]) => {
            //
            this.lastRefreshDate = data_stats[0].last_update;
            //Forming data
            this.tableDataInputs = new Array<InputsEntries>();
            for(var t_idx = 0; t_idx < data_stats[0].inputs_variables.length; t_idx++){
                const t_entry : InputsEntries = { 
                    variable : data_stats[0].inputs_variables[t_idx],
                    latest : data_stats[0].inputs_now[t_idx],
                    change : data_stats[0].inputs_change[t_idx]
                }
                this.tableDataInputs.push(t_entry);
            }
            this.flagTableInputs = true;
            //
            //Growth cons
            //
            this.tableDataInputsGrowCons = new Array<InputsEntriesGroups>();
            var t_sum = 0
            if(data_stats[0].act_g_cons_variables){
                for(var t_idx = 0; t_idx < data_stats[0].act_g_cons_variables.length; t_idx++){
                    const t_entry : InputsEntriesGroups = { 
                        variable : data_stats[0].act_g_cons_variables[t_idx],
                        latest : data_stats[0].act_g_cons_now[t_idx],
                        change : data_stats[0].act_g_cons_change[t_idx],
                        impact : data_stats[0].act_g_cons_impact[t_idx]
                    }
                    t_sum = t_sum + data_stats[0].act_g_cons_impact[t_idx]
                    this.tableDataInputsGrowCons.push(t_entry);
                }
            }
            const t_entry : InputsEntriesGroups = { 
                variable : "Aggregate",
                latest : data_stats[0].act_g_cons_agg_now,
                change : data_stats[0].act_g_cons_agg_change,
                impact : Math.round((data_stats[0].act_g_cons_agg_change - t_sum )*100)/100
            }
            this.tableDataInputsGrowCons.push(t_entry);
            this.flagTableInputsGrowCons = true;
            //
            //Growth mfg
            //
            this.tableDataInputsGrowMfg = new Array<InputsEntriesGroups>();
            var t_sum = 0
            if(data_stats[0].act_g_mfg_variables){
                for(var t_idx = 0; t_idx < data_stats[0].act_g_mfg_variables.length; t_idx++){
                    const t_entry : InputsEntriesGroups = { 
                        variable : data_stats[0].act_g_mfg_variables[t_idx],
                        latest : data_stats[0].act_g_mfg_now[t_idx],
                        change : data_stats[0].act_g_mfg_change[t_idx],
                        impact : data_stats[0].act_g_mfg_impact[t_idx]
                    }
                    t_sum = t_sum + data_stats[0].act_g_mfg_impact[t_idx]
                    this.tableDataInputsGrowMfg.push(t_entry);
                }
            }
            const t_entry2 : InputsEntriesGroups = { 
                variable : "Aggregate",
                latest : data_stats[0].act_g_mfg_agg_now,
                change : data_stats[0].act_g_mfg_agg_change,
                impact : Math.round((data_stats[0].act_g_mfg_agg_change - t_sum )*100)/100
            }
            this.tableDataInputsGrowMfg.push(t_entry2);
            this.flagTableInputsGrowMfg = true;
            //
            //Growth trade
            //
            this.tableDataInputsGrowTrade = new Array<InputsEntriesGroups>();
            var t_sum = 0
            if(data_stats[0].act_g_trade_variables){
                for(var t_idx = 0; t_idx < data_stats[0].act_g_trade_variables.length; t_idx++){
                    const t_entry : InputsEntriesGroups = { 
                        variable : data_stats[0].act_g_trade_variables[t_idx],
                        latest : data_stats[0].act_g_trade_now[t_idx],
                        change : data_stats[0].act_g_trade_change[t_idx],
                        impact : data_stats[0].act_g_trade_impact[t_idx]
                    }
                    t_sum = t_sum + data_stats[0].act_g_trade_impact[t_idx]
                    this.tableDataInputsGrowMfg.push(t_entry);
                }
            }
            const t_entry3 : InputsEntriesGroups = { 
                variable : "Aggregate",
                latest : data_stats[0].act_g_trade_agg_now,
                change : data_stats[0].act_g_trade_agg_change,
                impact : Math.round((data_stats[0].act_g_trade_agg_change - t_sum )*100)/100
            }
            this.tableDataInputsGrowTrade.push(t_entry3);
            this.flagTableInputsGrowTrade = true;
            //
            //Inflation consumer
            //
            this.tableDataInputsInfCons = new Array<InputsEntriesGroups>();
            var t_sum = 0
            if(data_stats[0].act_i_cons_variables){
                for(var t_idx = 0; t_idx < data_stats[0].act_i_cons_variables.length; t_idx++){
                    const t_entry : InputsEntriesGroups = { 
                        variable : data_stats[0].act_i_cons_variables[t_idx],
                        latest : data_stats[0].act_i_cons_now[t_idx],
                        change : data_stats[0].act_i_cons_change[t_idx],
                        impact : data_stats[0].act_i_cons_impact[t_idx]
                    }
                    t_sum = t_sum + data_stats[0].act_i_cons_impact[t_idx]
                    this.tableDataInputsInfCons.push(t_entry);
                }
            }
            const t_entry4 : InputsEntriesGroups = { 
                variable : "Aggregate",
                latest : data_stats[0].act_i_cons_agg_now,
                change : data_stats[0].act_i_cons_agg_change,
                impact : Math.round((data_stats[0].act_i_cons_agg_change - t_sum )*100)/100
            }
            this.tableDataInputsInfCons.push(t_entry4);
            this.flagTableInputsInfCons = true;
            //
            //Inflation mfg
            //
            this.tableDataInputsInfMfg = new Array<InputsEntriesGroups>();
            var t_sum = 0
            if(data_stats[0].act_i_mfg_variables){
                for(var t_idx = 0; t_idx < data_stats[0].act_i_mfg_variables.length; t_idx++){
                    const t_entry : InputsEntriesGroups = { 
                        variable : data_stats[0].act_i_mfg_variables[t_idx],
                        latest : data_stats[0].act_i_mfg_now[t_idx],
                        change : data_stats[0].act_i_mfg_change[t_idx],
                        impact : data_stats[0].act_i_mfg_impact[t_idx]
                    }
                    t_sum = t_sum + data_stats[0].act_i_mfg_impact[t_idx]
                    this.tableDataInputsInfMfg.push(t_entry);
                }
            }
            const t_entry5 : InputsEntriesGroups = { 
                variable : "Aggregate",
                latest : data_stats[0].act_i_mfg_agg_now,
                change : data_stats[0].act_i_mfg_agg_change,
                impact : Math.round((data_stats[0].act_i_mfg_agg_change - t_sum )*100)/100
            }
            this.tableDataInputsInfMfg.push(t_entry5);
            this.flagTableInputsInfMfg = true;
            //
            //Inflation trade
            //
            this.tableDataInputsInfTrade = new Array<InputsEntriesGroups>();
            var t_sum = 0
            if(data_stats[0].act_i_trade_variables){
                for(var t_idx = 0; t_idx < data_stats[0].act_i_trade_variables.length; t_idx++){
                    const t_entry : InputsEntriesGroups = { 
                        variable : data_stats[0].act_i_trade_variables[t_idx],
                        latest : data_stats[0].act_i_trade_now[t_idx],
                        change : data_stats[0].act_i_trade_change[t_idx],
                        impact : data_stats[0].act_i_trade_impact[t_idx]
                    }
                    t_sum = t_sum + data_stats[0].act_i_trade_impact[t_idx]
                    this.tableDataInputsInfTrade.push(t_entry);
                }
            }
            const t_entry6 : InputsEntriesGroups = { 
                variable : "Aggregate",
                latest : data_stats[0].act_i_trade_agg_now,
                change : data_stats[0].act_i_trade_agg_change,
                impact : Math.round((data_stats[0].act_i_trade_agg_change - t_sum )*100)/100
            }
            this.tableDataInputsInfTrade.push(t_entry6);
            this.flagTableInputsInfTrade = true;
            //
            //Outlook baseline
            //
            this.tableFactorsOutlookBase = new Array<InputsOutlook>();
            for(var t_idx = 0; t_idx < data_stats[0].out_base_labels.length; t_idx+=2){
                var g_cons = 0;
                var g_delta = 0;
                if(data_stats[0].out_base_g_cons){
                    g_cons = data_stats[0].out_base_g_cons[t_idx]
                    g_delta = data_stats[0].out_base_g_cons[t_idx+1]
                }
                var g_mfg = 0;
                var g_m_delta = 0;
                if(data_stats[0].out_base_g_mfg){
                    g_mfg = data_stats[0].out_base_g_mfg[t_idx]
                    g_m_delta = data_stats[0].out_base_g_mfg[t_idx+1]
                }
                var g_trade = 0;
                var g_m_trade = 0;
                if(data_stats[0].out_base_g_trade){
                    g_trade = data_stats[0].out_base_g_trade[t_idx]
                    g_m_trade = data_stats[0].out_base_g_trade[t_idx+1]
                }
                var i_cons = 0;
                var i_m_cons = 0;
                if(data_stats[0].out_base_i_cons){
                    i_cons = data_stats[0].out_base_i_cons[t_idx]
                    i_m_cons = data_stats[0].out_base_i_cons[t_idx+1]
                }
                var i_mfg = 0;
                var i_m_mfg = 0;
                if(data_stats[0].out_base_i_mfg){
                    i_mfg = data_stats[0].out_base_i_mfg[t_idx]
                    i_m_mfg = data_stats[0].out_base_i_mfg[t_idx+1]
                }
                var i_trade = 0;
                var i_m_trade = 0;
                if(data_stats[0].out_base_i_trade){
                    i_trade = data_stats[0].out_base_i_trade[t_idx]
                    i_m_trade = data_stats[0].out_base_i_cons[t_idx+1]
                }
                
                const t_entry : InputsOutlook = { 
                    variable : data_stats[0].out_base_labels[t_idx],
                    g_cons_latest : g_cons,
                    g_cons_change : g_delta,
                    g_mfg_latest : g_mfg,
                    g_mfg_change : g_m_delta,
                    g_trade_latest : g_trade,
                    g_trade_change : g_m_trade,
                    //
                    i_cons_latest : i_cons,
                    i_cons_change : i_m_cons,
                    i_mfg_latest : i_mfg,
                    i_mfg_change : i_m_mfg,
                    i_trade_latest : i_trade,
                    i_trade_change : i_m_trade,
                    
                }
                this.tableFactorsOutlookBase.push(t_entry);
            }
            this.flagTableFactorsOutlookBase = true;
            //Consensus
            this.tableFactorsOutlookCons = new Array<InputsOutlook>();
            for(var t_idx = 0; t_idx < data_stats[0].out_cons_labels.length; t_idx+=2){
                var g_cons = 0;
                var g_delta = 0;
                if(data_stats[0].out_cons_g_cons){
                    g_cons = data_stats[0].out_cons_g_cons[t_idx]
                    g_delta = data_stats[0].out_cons_g_cons[t_idx+1]
                }
                var g_mfg = 0;
                var g_m_delta = 0;
                if(data_stats[0].out_cons_g_mfg){
                    g_mfg = data_stats[0].out_cons_g_mfg[t_idx]
                    g_m_delta = data_stats[0].out_cons_g_mfg[t_idx+1]
                }
                var g_trade = 0;
                var g_m_trade = 0;
                if(data_stats[0].out_cons_g_trade){
                    g_trade = data_stats[0].out_cons_g_trade[t_idx]
                    g_m_trade = data_stats[0].out_cons_g_trade[t_idx+1]
                }
                var i_cons = 0;
                var i_m_cons = 0;
                if(data_stats[0].out_cons_i_cons){
                    i_cons = data_stats[0].out_cons_i_cons[t_idx]
                    i_m_cons = data_stats[0].out_cons_i_cons[t_idx+1]
                }
                var i_mfg = 0;
                var i_m_mfg = 0;
                if(data_stats[0].out_cons_i_mfg){
                    i_mfg = data_stats[0].out_cons_i_mfg[t_idx]
                    i_m_mfg = data_stats[0].out_cons_i_mfg[t_idx+1]
                }
                var i_trade = 0;
                var i_m_trade = 0;
                if(data_stats[0].out_cons_i_trade){
                    i_trade = data_stats[0].out_cons_i_trade[t_idx]
                    i_m_trade = data_stats[0].out_cons_i_trade[t_idx+1]
                }
                
                const t_entry : InputsOutlook = { 
                    variable : data_stats[0].out_cons_labels[t_idx],
                    g_cons_latest : g_cons,
                    g_cons_change : g_delta,
                    g_mfg_latest : g_mfg,
                    g_mfg_change : g_m_delta,
                    g_trade_latest : g_trade,
                    g_trade_change : g_m_trade,
                    //
                    i_cons_latest : i_cons,
                    i_cons_change : i_m_cons,
                    i_mfg_latest : i_mfg,
                    i_mfg_change : i_m_mfg,
                    i_trade_latest : i_trade,
                    i_trade_change : i_m_trade,
                    
                }
                this.tableFactorsOutlookCons.push(t_entry);
            }
            this.flagTableFactorsOutlookCons = true;    
            //
            //Key variables
            //
            this.tableKeyOutlookBase = new Array<InputsKey>();
            for(var t_idx = 0; t_idx < data_stats[0].keyVar_base_labels.length; t_idx+=2){
                var gdp_cons = 0;
                var gdp_delta = 0;
                if(data_stats[0].keyVar_base_rgdp){
                    gdp_cons = data_stats[0].keyVar_base_rgdp[t_idx]
                    gdp_delta = data_stats[0].keyVar_base_rgdp[t_idx+1]
                }
                var ip_cons = 0;
                var ip_delta = 0;
                if(data_stats[0].keyVar_base_ip){
                    ip_cons = data_stats[0].keyVar_base_ip[t_idx]
                    ip_delta = data_stats[0].keyVar_base_ip[t_idx+1]
                }
                var consExp_cons = 0;
                var consExp_delta = 0;
                if(data_stats[0].keyVar_base_cons_exp){
                    consExp_cons = data_stats[0].keyVar_base_cons_exp[t_idx]
                    consExp_delta = data_stats[0].keyVar_base_cons_exp[t_idx+1]
                }                
                var deflator_cons = 0;
                var deflator_delta = 0;
                if(data_stats[0].keyVar_base_deflator){
                    deflator_cons = data_stats[0].keyVar_base_deflator[t_idx]
                    deflator_delta = data_stats[0].keyVar_base_deflator[t_idx+1]
                }
                var ppi_cons = 0;
                var ppi_delta = 0;
                if(data_stats[0].keyVar_base_ppi){
                    ppi_cons = data_stats[0].keyVar_base_ppi[t_idx]
                    ppi_delta = data_stats[0].keyVar_base_ppi[t_idx+1]
                }                
                var cpi_cons = 0;
                var cpi_delta = 0;
                if(data_stats[0].keyVar_base_cpi){
                    cpi_cons = data_stats[0].keyVar_base_cpi[t_idx]
                    cpi_delta = data_stats[0].keyVar_base_cpi[t_idx+1]
                }

                const t_entry : InputsKey = { 
                    variable : data_stats[0].keyVar_base_labels[t_idx],
                    rgdp_latest : gdp_cons,
                    rgdp_change : gdp_delta,
                    ip_latest : ip_cons,
                    ip_change : ip_delta,
                    consExp_latest : consExp_cons,
                    consExp_change : consExp_delta,
                    //
                    deflator_latest : deflator_cons,
                    deflator_change : deflator_delta,
                    ppi_latest : ppi_cons,
                    ppi_change : ppi_delta,
                    cpi_latest : cpi_cons,
                    cpi_change : cpi_delta,
                    
                }
                this.tableKeyOutlookBase.push(t_entry);
            }
            this.flagTableKeyOutlookBase = true;
            //
            this.tableKeyOutlookCons = new Array<InputsKey>();
            for(var t_idx = 0; t_idx < data_stats[0].keyVar_cons_labels.length; t_idx+=2){
                var gdp_cons = 0;
                var gdp_delta = 0;
                if(data_stats[0].keyVar_cons_rgdp){
                    gdp_cons = data_stats[0].keyVar_cons_rgdp[t_idx]
                    gdp_delta = data_stats[0].keyVar_cons_rgdp[t_idx+1]
                }
                var ip_cons = 0;
                var ip_delta = 0;
                if(data_stats[0].keyVar_cons_ip){
                    ip_cons = data_stats[0].keyVar_cons_ip[t_idx]
                    ip_delta = data_stats[0].keyVar_cons_ip[t_idx+1]
                }
                var consExp_cons = 0;
                var consExp_delta = 0;
                if(data_stats[0].keyVar_cons_cons_exp){
                    consExp_cons = data_stats[0].keyVar_cons_cons_exp[t_idx]
                    consExp_delta = data_stats[0].keyVar_cons_cons_exp[t_idx+1]
                }                
                var deflator_cons = 0;
                var deflator_delta = 0;
                if(data_stats[0].keyVar_cons_deflator){
                    deflator_cons = data_stats[0].keyVar_cons_deflator[t_idx]
                    deflator_delta = data_stats[0].keyVar_cons_deflator[t_idx+1]
                }
                var ppi_cons = 0;
                var ppi_delta = 0;
                if(data_stats[0].keyVar_cons_ppi){
                    ppi_cons = data_stats[0].keyVar_cons_ppi[t_idx]
                    ppi_delta = data_stats[0].keyVar_cons_ppi[t_idx+1]
                }                
                var cpi_cons = 0;
                var cpi_delta = 0;
                if(data_stats[0].keyVar_cons_cpi){
                    cpi_cons = data_stats[0].keyVar_cons_cpi[t_idx]
                    cpi_delta = data_stats[0].keyVar_cons_cpi[t_idx+1]
                }

                const t_entry : InputsKey = { 
                    variable : data_stats[0].keyVar_cons_labels[t_idx],
                    rgdp_latest : gdp_cons,
                    rgdp_change : gdp_delta,
                    ip_latest : ip_cons,
                    ip_change : ip_delta,
                    consExp_latest : consExp_cons,
                    consExp_change : consExp_delta,
                    //
                    deflator_latest : deflator_cons,
                    deflator_change : deflator_delta,
                    ppi_latest : ppi_cons,
                    ppi_change : ppi_delta,
                    cpi_latest : cpi_cons,
                    cpi_change : cpi_delta,
                    
                }
                this.tableKeyOutlookCons.push(t_entry);
            }
            this.flagTableKeyOutlookCons = true;
            //
            //FX
            //
            this.tableFXData = new Array<InputFX>();
            for(var t_idx = 0; t_idx < data_stats[0].FX_base_labels.length; t_idx+=2){
                var base_value = 0;
                var base_delta = 0;
                if(data_stats[0].FX_base_values){
                    base_value = data_stats[0].FX_base_values[t_idx]
                    base_delta = data_stats[0].FX_base_values[t_idx+1]
                }
                var cons_value = 0;
                var cons_delta = 0;
                if(data_stats[0].FX_cons_values){
                    cons_value = data_stats[0].FX_cons_values[t_idx]
                    cons_delta = data_stats[0].FX_cons_values[t_idx+1]
                }
                const t_entry : InputFX = { 
                    variable : data_stats[0].FX_base_labels[t_idx],
                    base_latest : base_value,
                    base_change : base_delta,
                    cons_latest : cons_value,
                    cons_change : cons_delta
                    
                }
                this.tableFXData.push(t_entry);
            }
            this.flagTableFXData = true;
            //
            //Term structure
            //
            if(data_stats[0].Term_base_tenors){
                this.tableTermData = new Array<InputFX>();
                for(var t_idx = 0; t_idx < data_stats[0].Term_base_tenors.length; t_idx++){
                    const t_entry : InputFX = { 
                        variable : data_stats[0].Term_base_tenors[t_idx],
                        base_latest : data_stats[0].Term_base_latest[t_idx],
                        base_change : data_stats[0].Term_base_change[t_idx],
                        cons_latest : data_stats[0].Term_cons_latest[t_idx],
                        cons_change : data_stats[0].Term_cons_change[t_idx]
                    }
                    this.tableTermData.push(t_entry);
                }
                this.flagTableTermData = true;   
            }
            //
            //Tail growth
            //
            this.tableTailGrowthData = new Array<InputsEntries>();
            for(var t_idx = 0; t_idx < data_stats[0].Tail_Growth_vars.length; t_idx+=2){
                const t_entry : InputsEntries = { 
                    variable : data_stats[0].Tail_Growth_vars[t_idx],
                    latest : data_stats[0].Tail_Growth_latest[t_idx],
                    change : data_stats[0].Tail_Growth_change[t_idx]
                }
                this.tableTailGrowthData.push(t_entry);
            }
            this.flagTableTailGrowthData = true;
            //
            //Tail CPI
            //
            this.tableTailCPIData = new Array<InputsEntries>();
            for(var t_idx = 0; t_idx < data_stats[0].Tail_CPI_vars.length; t_idx+=2){
                const t_entry : InputsEntries = { 
                    variable : data_stats[0].Tail_CPI_vars[t_idx],
                    latest : data_stats[0].Tail_CPI_latest[t_idx],
                    change : data_stats[0].Tail_CPI_change[t_idx]
                }
                this.tableTailCPIData.push(t_entry);
            }
            this.flagTableTailCPIData = true;
            //
            //Tail Equity
            //
            this.tableTailEquityData = new Array<InputsEntries>();
            if(data_stats[0].Tail_Equities_vars.length > 0){
                for(var t_idx = 0; t_idx < data_stats[0].Tail_Equities_vars.length; t_idx+=2){
                    const t_entry : InputsEntries = { 
                        variable : data_stats[0].Tail_Equities_vars[t_idx],
                        latest : data_stats[0].Tail_Equities_latest[t_idx],
                        change : data_stats[0].Tail_Equities_change[t_idx]
                    }
                    this.tableTailEquityData.push(t_entry);
                }
                this.flagTableTailEquityData = true;
            }
            //
            //Income parts
            //
            //0
            if(data_stats[0].Income_groups.length > 0){
                this.tableIncomeData1 = new Array<InputFX>();
                for(var t_idx = 0; t_idx < data_stats[0].Income_group_0_labels.length; t_idx+=2){
                    const t_entry : InputFX = { 
                        variable : data_stats[0].Income_group_0_labels[t_idx],
                        base_latest : data_stats[0].Income_group_0_base_latest[t_idx],
                        base_change : data_stats[0].Income_group_0_base_change[t_idx],
                        cons_latest : data_stats[0].Income_group_0_cons_latest[t_idx],
                        cons_change : data_stats[0].Income_group_0_cons_change[t_idx],
                    }
                    this.tableIncomeData1.push(t_entry);
                }   
                this.tableIncomeName1 = data_stats[0].Income_groups[0];
                this.flagTableIncomeData1 = true;
            }
            //1
            if(data_stats[0].Income_groups.length > 1){
                this.tableIncomeData2 = new Array<InputFX>();
                for(var t_idx = 0; t_idx < data_stats[0].Income_group_1_labels.length; t_idx+=2){
                    const t_entry : InputFX = { 
                        variable : data_stats[0].Income_group_1_labels[t_idx],
                        base_latest : data_stats[0].Income_group_1_base_latest[t_idx],
                        base_change : data_stats[0].Income_group_1_base_change[t_idx],
                        cons_latest : data_stats[0].Income_group_1_cons_latest[t_idx],
                        cons_change : data_stats[0].Income_group_1_cons_change[t_idx],
                    }
                    this.tableIncomeData2.push(t_entry);
                }   
                this.tableIncomeName2 = data_stats[0].Income_groups[1];
                this.flagTableIncomeData2 = true;
            }
            //2
            if(data_stats[0].Income_groups.length > 2){
                this.tableIncomeData3 = new Array<InputFX>();
                for(var t_idx = 0; t_idx < data_stats[0].Income_group_2_labels.length; t_idx+=2){
                    const t_entry : InputFX = { 
                        variable : data_stats[0].Income_group_2_labels[t_idx],
                        base_latest : data_stats[0].Income_group_2_base_latest[t_idx],
                        base_change : data_stats[0].Income_group_2_base_change[t_idx],
                        cons_latest : data_stats[0].Income_group_2_cons_latest[t_idx],
                        cons_change : data_stats[0].Income_group_2_cons_change[t_idx],
                    }
                    this.tableIncomeData3.push(t_entry);
                }   
                this.tableIncomeName3 = data_stats[0].Income_groups[2];
                this.flagTableIncomeData3 = true;
            }
            //3
            if(data_stats[0].Income_groups.length > 3){
                this.tableIncomeData4 = new Array<InputFX>();
                for(var t_idx = 0; t_idx < data_stats[0].Income_group_3_labels.length; t_idx+=2){
                    const t_entry : InputFX = { 
                        variable : data_stats[0].Income_group_3_labels[t_idx],
                        base_latest : data_stats[0].Income_group_3_base_latest[t_idx],
                        base_change : data_stats[0].Income_group_3_base_change[t_idx],
                        cons_latest : data_stats[0].Income_group_3_cons_latest[t_idx],
                        cons_change : data_stats[0].Income_group_3_cons_change[t_idx],
                    }
                    this.tableIncomeData4.push(t_entry);
                }   
                this.tableIncomeName4 = data_stats[0].Income_groups[3];
                this.flagTableIncomeData4 = true;
            }
            //4
            if(data_stats[0].Income_groups.length > 4){
                this.tableIncomeData5 = new Array<InputFX>();
                for(var t_idx = 0; t_idx < data_stats[0].Income_group_4_labels.length; t_idx+=2){
                    const t_entry : InputFX = { 
                        variable : data_stats[0].Income_group_4_labels[t_idx],
                        base_latest : data_stats[0].Income_group_4_base_latest[t_idx],
                        base_change : data_stats[0].Income_group_4_base_change[t_idx],
                        cons_latest : data_stats[0].Income_group_4_cons_latest[t_idx],
                        cons_change : data_stats[0].Income_group_4_cons_change[t_idx],
                    }
                    this.tableIncomeData5.push(t_entry);
                }   
                this.tableIncomeName5 = data_stats[0].Income_groups[4];
                this.flagTableIncomeData5 = true;
            }            
            //5
            if(data_stats[0].Income_groups.length > 5){
                this.tableIncomeData6 = new Array<InputFX>();
                for(var t_idx = 0; t_idx < data_stats[0].Income_group_5_labels.length; t_idx+=2){
                    const t_entry : InputFX = { 
                        variable : data_stats[0].Income_group_5_labels[t_idx],
                        base_latest : data_stats[0].Income_group_5_base_latest[t_idx],
                        base_change : data_stats[0].Income_group_5_base_change[t_idx],
                        cons_latest : data_stats[0].Income_group_5_cons_latest[t_idx],
                        cons_change : data_stats[0].Income_group_5_cons_change[t_idx],
                    }
                    this.tableIncomeData6.push(t_entry);
                }   
                this.tableIncomeName6 = data_stats[0].Income_groups[5];
                this.flagTableIncomeData6 = true;
            }            
            //6
            if(data_stats[0].Income_groups.length > 6){
                this.tableIncomeData7 = new Array<InputFX>();
                for(var t_idx = 0; t_idx < data_stats[0].Income_group_6_labels.length; t_idx+=2){
                    const t_entry : InputFX = { 
                        variable : data_stats[0].Income_group_6_labels[t_idx],
                        base_latest : data_stats[0].Income_group_6_base_latest[t_idx],
                        base_change : data_stats[0].Income_group_6_base_change[t_idx],
                        cons_latest : data_stats[0].Income_group_6_cons_latest[t_idx],
                        cons_change : data_stats[0].Income_group_6_cons_change[t_idx],
                    }
                    this.tableIncomeData7.push(t_entry);
                }   
                this.tableIncomeName7 = data_stats[0].Income_groups[6];
                this.flagTableIncomeData7 = true;
            }            
            //7
            if(data_stats[0].Income_groups.length > 7){
                this.tableIncomeData8 = new Array<InputFX>();
                for(var t_idx = 0; t_idx < data_stats[0].Income_group_7_labels.length; t_idx+=2){
                    const t_entry : InputFX = { 
                        variable : data_stats[0].Income_group_7_labels[t_idx],
                        base_latest : data_stats[0].Income_group_7_base_latest[t_idx],
                        base_change : data_stats[0].Income_group_7_base_change[t_idx],
                        cons_latest : data_stats[0].Income_group_7_cons_latest[t_idx],
                        cons_change : data_stats[0].Income_group_7_cons_change[t_idx],
                    }
                    this.tableIncomeData8.push(t_entry);
                }   
                this.tableIncomeName8 = data_stats[0].Income_groups[7];
                this.flagTableIncomeData8 = true;
            }
        });
    }
    
    ngOnInit() {
    }
}
