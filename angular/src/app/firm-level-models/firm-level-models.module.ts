import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { FirmLevelModelsRoutingModule } from './firm-level-models-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FirmLevelModelsComponent } from './firm-level-models.component';

import { ChartModule } from 'angular-highcharts';

@NgModule({
    imports: [
        FirmLevelModelsRoutingModule,
        CommonModule,
        NgbModule,
        ChartModule
    ],
    declarations: [
        FirmLevelModelsComponent
    ],
    providers: []
})
export class FirmLevelModelsModule {}
