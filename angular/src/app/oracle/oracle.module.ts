import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { OracleRoutingModule } from "./oracle-routing.module";
import { ChartistModule} from 'ng-chartist';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { OracleComponent } from "./oracle.component";

import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as highmaps from 'highcharts/modules/map.src';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import * as highstock from 'highcharts/modules/stock.src';

export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [more, exporting, highmaps, highstock];
}

@NgModule({
    imports: [
        CommonModule,
        OracleRoutingModule,
        FormsModule,
        ChartistModule,
        AgmCoreModule,
        NgbModule,
        ChartModule
    ],
    exports: [],
    declarations: [       
        OracleComponent
    ],
    providers: [
        { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules}
    ]
})

export class OracleModule { }
