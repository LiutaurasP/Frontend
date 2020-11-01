import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";

import { ChronosRoutingModule } from "./chronos-routing.module";
import { ChartistModule} from 'ng-chartist';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ChronosComponent } from "./chronos.component";

import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';

import { Ng2SmartTableModule } from 'ng2-smart-table';

export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [more, exporting];
}

@NgModule({
    imports: [
        CommonModule,
        ChronosRoutingModule,
        FormsModule,
        ChartistModule,
        AgmCoreModule,
        NgbModule,
        ChartModule,
        Ng2SmartTableModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports: [],
    declarations: [       
        ChronosComponent
    ],
    providers: [
        { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules}
    ]
})
export class ChronosModule { }
