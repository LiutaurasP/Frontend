import { Component } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FAQComponent  {
  title: string;
  constructor(private modalService: NgbModal) {}

 
  GetDetails(content, titleText) {
    this.title = titleText;
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {      
    }, (reason) => {     
    });
  }

  
  

}
