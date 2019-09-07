import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { AboutRoutingModule } from "./about-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from "../shared/directives/match-height.directive";

import { AboutComponent } from "./about.component";


@NgModule({
    imports: [
        CommonModule,
        AboutRoutingModule,
        NgbModule,
        MatchHeightModule
    ],
    exports: [],
    declarations: [
        AboutComponent
    ],
    providers: [],
})
export class AboutModule { }
