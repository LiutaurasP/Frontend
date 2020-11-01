import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface About_General{
    version: number;
    img_background: string;
    img_center: string;
    name_tab_1: string;
    name_tab_2: string;
    name_tab_3: string;
    name_tab_4: string;
};

export interface About_Tab1{
    tab_name: string;
    tab_subheader: string;
    tab_subdetails: string;
    tab_header: boolean;
    tab_subheader_icon: string;
    tab_status: string;
};

export interface About_Tab2{
    tab_name: string;
    entry_header: string;
    entry_icon: string;
    entry_details: boolean;
    entry_photo: string;
    entry_right: boolean;
};

export interface About_Tab3{
    tab_name: string;
    entry_title: string;
    entry_name: string;
    entry_photo: string;
    entry_desc: string;
    entry_email: string;
};

export interface About_Tab4{
    tab_name: string;
    entry_email: string;
    entry_icon: string;
    entry_title: string;
};

declare var require: any;

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})


export class AboutComponent {
    
    //specs
    specs_about_general : About_General;
    //tab 1
    specs_about_tab1_header : About_Tab1;
    specs_about_tab1_details : About_Tab1[];
    //tab 2
    specs_about_tab2 : About_Tab2[];
    //tab 3
    specs_about_tab3 : About_Tab3[];
    //tab 4
    specs_about_tab4 : About_Tab4[];
    
    //Variable Declaration
    currentPage: string = "Tab1"

    constructor(private http: HttpClient, private router: Router) {
    }
    
    ngOnInit() {
        //Base spec
        this.specs_about_general =  { 
            version: 0,
            img_background: "assets/img/photos/background-about.png", 
            img_center: "assets/img/portrait/avatars/avatar-about.png", 
            name_tab_1: "Story",
            name_tab_2: "Timeline",
            name_tab_3: "Team",
            name_tab_4: "Contacts"
        };
        
        //Pull about info
        this.http.get<About_General>('https://api.alphahuntsman.com/about/primaryDetails')
            .subscribe((data: About_General) => {
                    this.specs_about_general =  data;
                    //Pull individual page contents
                    this.http.get<About_Tab1[]>('https://api.alphahuntsman.com/about/details?sec=one&tab='+this.specs_about_general.name_tab_1)
                        .subscribe((data_details: About_Tab1[]) => {
                            this.specs_about_tab1_header = data_details[0];
                            this.specs_about_tab1_details = data_details.slice(1);
                            this.showPage(this.specs_about_general.name_tab_1);
                        });
                    //Timeline
                    this.http.get<About_Tab2[]>('https://api.alphahuntsman.com/about/details?sec=two&tab='+this.specs_about_general.name_tab_2)
                        .subscribe((data_details: About_Tab2[]) => {
                            this.specs_about_tab2 = data_details;
                        });
                    //Team
                    this.http.get<About_Tab3[]>('https://api.alphahuntsman.com/about/details?sec=three&tab='+this.specs_about_general.name_tab_3)
                        .subscribe((data_details: About_Tab3[]) => {
                            this.specs_about_tab3 = data_details;
                    });
                    //Contacts
                    this.http.get<About_Tab4[]>('https://api.alphahuntsman.com/about/details?sec=four&tab='+this.specs_about_general.name_tab_4)
                        .subscribe((data_details: About_Tab4[]) => {
                            this.specs_about_tab4 = data_details;
                    });
                },
                (err) => {
                    this.router.navigate(['/pages/maintenance']);
                }
            );
    }

    showPage(page: string) {
        this.currentPage = page;
    }
}
