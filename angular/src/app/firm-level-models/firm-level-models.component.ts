import { Component } from '@angular/core';

import { Chart } from 'angular-highcharts';

@Component({
    selector: 'app-firm-level-models',
    templateUrl: './firm-level-models.component.html',
    styleUrls: ['./firm-level-models.component.scss']
})

export class FirmLevelModelsComponent {
    // country list
    public countrySelected: string = 'Lithuania';
    public sectorSelected: string = 'Consumer Defensive';
    public industrySelected: string = 'Retail';
    public companySelected: string = 'Auga';
    
    public selected: boolean = false;
    
    public chart = new Chart({
        chart: {
          type: 'column'
        },
        title: {
          text: 'Stacked column chart'
        },
        credits: {
          enabled: false
        },
        xAxis: {
            categories: ['Value 4', 'Value 5', 'Value 6', 'Value 7', 'Value 8']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: 'grey'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [{
            name: 'Value 1',
            data: [5, 3, 4, 7, 2],
            type: 'column'
        }, {
            name: 'Value 2',
            data: [2, 2, 3, 2, 1],
            type: 'column'
        }, {
            name: 'Value 3',
            data: [3, 4, 4, 2, 5],
            type: 'column'
        }]
      });

    public constructor() {}
    
    public getDetails(): void {
        this.selected = true;
    }
}
