import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { PricingRoutingModule } from "./pricing-routing.module";
import { ChartistModule} from 'ng-chartist';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PricingComponent } from "./pricing.component";


@NgModule({
    imports: [
        CommonModule,
        PricingRoutingModule,
        FormsModule,
        ChartistModule,
        AgmCoreModule,
        NgbModule
    ],
    declarations: [       
        PricingComponent
    ]
})
export class PricingModule { }
