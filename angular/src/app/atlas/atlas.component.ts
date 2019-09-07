import { Component } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { MapChart } from 'angular-highcharts';
import { Chart } from 'angular-highcharts';

import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import 'rxjs/add/operator/map'


declare var require: any;
const worldMap = require('@highcharts/map-collection/custom/world.geo.json');

@Component({
    selector: 'app-atlas',
    templateUrl: './atlas.component.html',
    styleUrls: ['./atlas.component.scss']
})


export class AtlasComponent {
    
    countrySelected : string = "U.S."
    
    //Map selector
    countrySelector = (event: any) => {
        this.countrySelected = event.point["name"]
        console.log(event.point["name"]);
        console.log(event.point["hc-key"]);
    };
    
    countryList: string[] = ["U.S.", "Germany", "China"];
    //Dropdown selector
    countrySelectorDrop(newSortOrder: string){ 
        this.countrySelected = newSortOrder;
    }
    
    public lineOptions: any = {
            chart: {
                height: 500,
                width: 800
            },
            title: {
                text: 'Solar Employment Growth by Sector, 2010-2016'
            },
        
            subtitle: {
                text: 'Source: thesolarfoundation.com'
            },
        
            yAxis: {
                title: {
                    text: 'Number of Employees'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
        
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010
                }
            },
        
            series: [{
                name: 'Installation',
                data: [1, 2, 3, 4, 5, 6, 7, 8]
            }, {
                name: 'Manufacturing',
                data: [11, 21, 31, 41, 51, 61, 71, 81]
            }, {
                name: 'Sales & Distribution',
                data: [21, 22, 23, 24, 25, 26, 27, 28]
            }, {
                name: 'Project Development',
                data: [44, 55, 66, 77, 11, 88, 11, 33]
            }, {
                name: 'Other',
                data: [90, 72, 122, 141, 65, 71, 23, 41]
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
            map: worldMap,
            height: 600,
            spacingLeft: 0

        },
        mapNavigation: {
          enabled: true,
          enableMouseWheelZoom: false,
          buttonOptions: {
            alignTo: 'spacingBox'
          },
          buttons: {
                zoomIn: {
                    // the lower the value, the greater the zoom in
                    onclick: function () { this.mapZoom(0.5); }
                },
                zoomOut: {
                    // the higher the value, the greater the zoom out
                    onclick: function () { this.mapZoom(1.5); }
                }
            }
        },
        colorAxis: {
          min: 0
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
            data: [
                ['fo', 0],
                ['um', 1],
                ['us', 2],
                ['jp', 3],
                ['sc', 4],
                ['in', 5],
                ['fr', 6],
                ['fm', 7],
                ['cn', 8],
                ['pt', 9],
                ['sw', 10],
                ['sh', 11],
                ['br', 12],
                ['ki', 13],
                ['ph', 14],
                ['mx', 15],
                ['es', 16],
                ['bu', 17],
                ['mv', 18],
                ['sp', 19],
                ['gb', 20],
                ['gr', 21],
                ['as', 22],
                ['dk', 23],
                ['gl', 24],
                ['gu', 25],
                ['mp', 26],
                ['pr', 27],
                ['vi', 28],
                ['ca', 29],
                ['st', 30],
                ['cv', 31],
                ['dm', 32],
                ['nl', 33],
                ['jm', 34],
                ['ws', 35],
                ['om', 36],
                ['vc', 37],
                ['tr', 38],
                ['bd', 39],
                ['lc', 40],
                ['nr', 41],
                ['no', 42],
                ['kn', 43],
                ['bh', 44],
                ['to', 45],
                ['fi', 46],
                ['id', 47],
                ['mu', 48],
                ['se', 49],
                ['tt', 50],
                ['my', 51],
                ['pa', 52],
                ['pw', 53],
                ['tv', 54],
                ['mh', 55],
                ['cl', 56],
                ['th', 57],
                ['gd', 58],
                ['ee', 59],
                ['ag', 60],
                ['tw', 61],
                ['bb', 62],
                ['it', 63],
                ['mt', 64],
                ['vu', 65],
                ['sg', 66],
                ['cy', 67],
                ['lk', 68],
                ['km', 69],
                ['fj', 70],
                ['ru', 71],
                ['va', 72],
                ['sm', 73],
                ['kz', 74],
                ['az', 75],
                ['tj', 76],
                ['ls', 77],
                ['uz', 78],
                ['ma', 79],
                ['co', 80],
                ['tl', 81],
                ['tz', 82],
                ['ar', 83],
                ['sa', 84],
                ['pk', 85],
                ['ye', 86],
                ['ae', 87],
                ['ke', 88],
                ['pe', 89],
                ['do', 90],
                ['ht', 91],
                ['pg', 92],
                ['ao', 93],
                ['kh', 94],
                ['vn', 95],
                ['mz', 96],
                ['cr', 97],
                ['bj', 98],
                ['ng', 99],
                ['ir', 100],
                ['sv', 101],
                ['sl', 102],
                ['gw', 103],
                ['hr', 104],
                ['bz', 105],
                ['za', 106],
                ['cf', 107],
                ['sd', 108],
                ['cd', 109],
                ['kw', 110],
                ['de', 111],
                ['be', 112],
                ['ie', 113],
                ['kp', 114],
                ['kr', 115],
                ['gy', 116],
                ['hn', 117],
                ['mm', 118],
                ['ga', 119],
                ['gq', 120],
                ['ni', 121],
                ['lv', 122],
                ['ug', 123],
                ['mw', 124],
                ['am', 125],
                ['sx', 126],
                ['tm', 127],
                ['zm', 128],
                ['nc', 129],
                ['mr', 130],
                ['dz', 131],
                ['lt', 132],
                ['et', 133],
                ['er', 134],
                ['gh', 135],
                ['si', 136],
                ['gt', 137],
                ['ba', 138],
                ['jo', 139],
                ['sy', 140],
                ['mc', 141],
                ['al', 142],
                ['uy', 143],
                ['cnm', 144],
                ['mn', 145],
                ['rw', 146],
                ['so', 147],
                ['bo', 148],
                ['cm', 149],
                ['cg', 150],
                ['eh', 151],
                ['rs', 152],
                ['me', 153],
                ['tg', 154],
                ['la', 155],
                ['af', 156],
                ['ua', 157],
                ['sk', 158],
                ['jk', 159],
                ['bg', 160],
                ['qa', 161],
                ['li', 162],
                ['at', 163],
                ['sz', 164],
                ['hu', 165],
                ['ro', 166],
                ['ne', 167],
                ['lu', 168],
                ['ad', 169],
                ['ci', 170],
                ['lr', 171],
                ['bn', 172],
                ['iq', 173],
                ['ge', 174],
                ['gm', 175],
                ['ch', 176],
                ['td', 177],
                ['kv', 178],
                ['lb', 179],
                ['dj', 180],
                ['bi', 181],
                ['sr', 182],
                ['il', 183],
                ['ml', 184],
                ['sn', 185],
                ['gn', 186],
                ['zw', 187],
                ['pl', 188],
                ['mk', 189],
                ['py', 190],
                ['by', 191],
                ['cz', 192],
                ['bf', 193],
                ['na', 194],
                ['ly', 195],
                ['tn', 196],
                ['bt', 197],
                ['md', 198],
                ['ss', 199],
                ['bw', 200],
                ['bs', 201],
                ['nz', 202],
                ['cu', 203],
                ['ec', 204],
                ['au', 205],
                ['ve', 206],
                ['sb', 207],
                ['mg', 208],
                ['is', 209],
                ['eg', 210],
                ['kg', 211],
                ['np', 212]
            ]
        }]
    };
    
    title: string;
    
    GetDetails(content, titleText) {
        this.title = titleText;
            this.modalService.open(content, { size: 'lg' }).result.then((result) => {      
            }, (reason) => {     
        });
    }
    
    mapChart : any;
    lineChart : any;
    
    subscription: Subscription;
    constructor(private http: HttpClient, private modalService: NgbModal) { }
  
    ngOnInit(){
        this.mapChart = new MapChart(this.mapOptions);
        
        const source = interval(600000);
        const apiLink = 'https://f55607903aab4c95b714acd1bc11cb7f.vfs.cloud9.eu-west-1.amazonaws.com/assets/temp/line.json';
        this.http.get<any[]>(apiLink).subscribe(
            res => {
                const data_install = [];
                const data_manu = [];
                const data_other = [];
                const data_project = [];
                const data_sales = [];
                const data_TS = [];
                res.forEach(row => {
                    data_install.push(row.Installation);
                    data_manu.push(row.Manufacturing);
                    data_other.push(row.Other);
                    data_project.push(row.Project);
                    data_sales.push(row.Sales);
                    data_TS.push(row.Timestamp);
                });
                this.lineOptions.series[0]['data'] = data_install;
                this.lineOptions.series[1]['data'] = data_manu;
                this.lineOptions.series[2]['data'] = data_other;
                this.lineOptions.series[3]['data'] = data_project;
                this.lineOptions.series[4]['data'] = data_sales;
                this.lineChart = new Chart(this.lineOptions);
                 /*
                    const temp_row = [
                        new Date(row.timestamp).getTime(),
                        row.value
                    ];
                });
                */

            },
            err => {
                console.log(err);
            }
        );
    }
}