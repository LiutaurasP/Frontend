import { Component } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface FAQ_Entry{
    category_name: string;
    category_details: string;
    category_icon: string;
    feature_name: string;
    feature_color: string;
    feature_details: string;
    feature_order: number;
};

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FAQComponent  {
  specs_all : FAQ_Entry[];
  specs_labels_all : string[];
  specs_labels_lower : string[];
  
  title: string;
  modal_content: string;
  modal_header_color: string;
  constructor(
    private modalService: NgbModal,
    private http: HttpClient
    ) {
      this.specs_labels_all = new Array<string>();
    }

   ngOnInit() {
    //Timeline
    this.http.get<FAQ_Entry[]>('https://api.alphahuntsman.com/faq')
        .subscribe((data_details: FAQ_Entry[]) => {
          this.specs_all = data_details;
          //Unique
          for (var entry of data_details) {
            if(this.specs_labels_all.indexOf(entry.category_name) == -1 ){
               this.specs_labels_all.push(entry.category_name);
            }
          }
          this.specs_labels_lower = this.specs_labels_all.slice(3);
          this.specs_labels_all = this.specs_labels_all.slice(0,3);
        });
  }
 
  GetDetails(content, titleText, titleGroup) {
    this.title = titleText;
    this.modal_content = (this.specs_all.filter(entry => entry.feature_name === titleGroup && entry.category_name === titleText ))[0].feature_details;
    this.modal_header_color = (this.specs_all.filter(entry => entry.feature_name === titleGroup && entry.category_name === titleText ))[0].feature_color;
    this.title = titleText;
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {      
    }, (reason) => {     
    });
  }

  GetFiltered( t_category ){
    return this.specs_all.filter(entry => entry.category_name === t_category);
  }
  
  GetFilteredCategoryDetails( t_category ){
    return (this.specs_all.filter(entry => entry.category_name === t_category)[0]);
  }
}
