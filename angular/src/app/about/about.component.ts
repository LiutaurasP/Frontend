import { Component } from '@angular/core';

declare var require: any;

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})

export class AboutComponent {
    
    //Variable Declaration
    currentPage: string = "Story"

    ngOnInit() {
    }

    showPage(page: string) {
        this.currentPage = page;
    }
}
