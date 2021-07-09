import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpClient } from '@angular/common/http';

import { AtlasRoutingModule } from "./atlas-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'; 
import { MatchHeightModule } from "../shared/directives/match-height.directive";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { AtlasComponent } from "./atlas.component";
import { CustomLoader } from '../shared/translation/CustomLoader';

import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as highmaps from 'highcharts/modules/map.src';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import * as highstock from 'highcharts/modules/stock.src';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [more, exporting, highmaps, highstock];
}

@NgModule({
    imports: [
        CommonModule,
        AtlasRoutingModule,
        NgbModule,
        NgbDropdownModule,
        MatchHeightModule,
        ChartModule,
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
        AtlasComponent
    ],
    providers: [
        { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules}
    ],
})
export class AtlasModule { }
