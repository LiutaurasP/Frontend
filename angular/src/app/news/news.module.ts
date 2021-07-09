import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { NewsRoutingModule } from './news-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from 'ngx-quill'

import { NewsComponent } from './news.component';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        NewsRoutingModule,
        FormsModule,
        QuillModule.forRoot()
    ],
    exports: [],
    declarations: [
        NewsComponent
    ],
    providers: []
})
export class NewsModule {}
