import { Component } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface Pricing_Entry{
    access_type: string;
    access_details: string;
    feature_name: string;
    feature_color: string;
    feature_details: string;
    feature_order: number;
};

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})

export class PricingComponent  {
  specs_pricing_free : Pricing_Entry[];
  specs_pricing_personal : Pricing_Entry[];
  specs_pricing_pro : Pricing_Entry[];
  specs_pricing_all : Pricing_Entry[];

  title: string;
  modal_content: string;
  modal_header_color: string;
  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private router: Router
  ) {}
    
  ngOnInit() {
    //Timeline
    this.http.get<Pricing_Entry[]>('https://api.alphahuntsman.com/pricing')
        .subscribe((data_details: Pricing_Entry[]) => {
          this.specs_pricing_free = data_details.filter(entry => entry.access_type === "Enthusiat");
          this.specs_pricing_personal = data_details.filter(entry => entry.access_type === "Professional");
          this.specs_pricing_pro = data_details.filter(entry => entry.access_type === "Commercial");
          this.specs_pricing_all = data_details
        },
        (err) => {
          this.router.navigate(['/pages/maintenance']);
        });
  }

 
  GetDetails(content, titleText, titleGroup) {
    this.title = titleText;
    this.modal_content = (this.specs_pricing_all.filter(entry => entry.access_type === titleGroup && entry.feature_name === titleText ))[0].feature_details;
    this.modal_header_color = (this.specs_pricing_all.filter(entry => entry.access_type === titleGroup && entry.feature_name === titleText ))[0].feature_color;
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {      
    }, (reason) => {     
    });
  }

  
  

}
