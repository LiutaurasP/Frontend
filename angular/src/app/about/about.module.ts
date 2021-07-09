import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpClient } from '@angular/common/http';

import { AboutRoutingModule } from "./about-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from "../shared/directives/match-height.directive";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AboutComponent } from "./about.component";
import { CustomLoader } from '../shared/translation/CustomLoader';


@NgModule({
    imports: [
        CommonModule,
        AboutRoutingModule,
        NgbModule,
        MatchHeightModule,
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
        AboutComponent
    ],
    providers: [],
})
export class AboutModule { }
