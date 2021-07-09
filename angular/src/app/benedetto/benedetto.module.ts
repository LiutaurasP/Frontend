import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { HttpClient } from '@angular/common/http';

import { BenedettoRoutingModule } from "./benedetto-routing.module";
import { ChartistModule} from 'ng-chartist';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { BenedettoComponent } from "./benedetto.component";
import { CustomLoader } from '../shared/translation/CustomLoader';

import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import * as highstock from 'highcharts/modules/stock.src';

export function highchartsModules() {
//   apply Highcharts Modules to this array
  return [more, exporting, highstock];
}

@NgModule({
    imports: [
        CommonModule,
        BenedettoRoutingModule,
        FormsModule,
        ChartistModule,
        AgmCoreModule,
        NgbModule,
        ChartModule,
        ReactiveFormsModule,
        RouterModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: CustomLoader,
            deps: [HttpClient]
          }
        })
    ],
    exports: [],
    declarations: [       
        BenedettoComponent
    ],
    providers: [
        { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules}
    ]
})

export class BenedettoModule { }
