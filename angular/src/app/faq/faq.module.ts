import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { FAQRoutingModule } from "./faq-routing.module";
import { ChartistModule} from 'ng-chartist';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FAQComponent } from "./faq.component";


@NgModule({
    imports: [
        CommonModule,
        FAQRoutingModule,
        FormsModule,
        ChartistModule,
        AgmCoreModule,
        NgbModule
    ],
    declarations: [       
        FAQComponent
    ]
})
export class FAQModule { }
