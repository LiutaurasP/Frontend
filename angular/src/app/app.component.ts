import { Component, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import defaultLanguage from '../assets/i18n/en.json';

declare let gtag:Function;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

    subscription: Subscription;

    constructor(private router: Router, private translate: TranslateService) {
        this.router.events.subscribe((y: NavigationEnd) => {
          if(y instanceof NavigationEnd){
            gtag('config','UA-32819575-1',{'page_path' : y.url});
          }
        });
        translate.setTranslation('en', defaultLanguage);
        translate.setDefaultLang('en');
    }

    ngOnInit() {
        this.subscription = this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd)
            )
            .subscribe(() => window.scrollTo(0, 0));
    }


    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }



}