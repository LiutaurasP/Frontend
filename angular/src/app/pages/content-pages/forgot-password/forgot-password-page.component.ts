import { Component, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/auth/auth.service';


@Component({
    selector: 'app-forgot-password-page',
    templateUrl: './forgot-password-page.component.html',
    styleUrls: ['./forgot-password-page.component.scss']
})

export class ForgotPasswordPageComponent {
    forgotForm: FormGroup;    
    loading = false;
    submitted = false;
    flagDone = false;
    flagDoneValidates = false;
    
    tmpParam: string;
    
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthService,
        private route: ActivatedRoute
        ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
        this.flagDoneValidates = false;
        this.flagDone = false;
        this.route.queryParams.subscribe(params => {
            this.tmpParam = params['key'];
            //To to authenticate
            if (this.tmpParam){
                this.authenticationService.forgotPassKey(this.tmpParam)
                    .pipe(first())
                    .subscribe(
                        data => {
                            this.loading = false;
                            this.flagDoneValidates = true;
                            this.router.navigate(['/']);
                        },
                        error => {
                            this.loading = false;
                        });

            }
            if (this.authenticationService.currentUserValue) {
                this.router.navigate(['/']);
            }   
        });
    }
    
    ngOnInit() {
        this.forgotForm = this.formBuilder.group({
            username: ['', [Validators.required,, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.forgotForm.controls; }

    //  On submit click, reset field value
    onSubmit() {
        this.flagDone = false;
        this.submitted = true;

        // stop here if form is invalid
        if (this.forgotForm.invalid) {
            return;
        }
        this.loading = true;
        this.authenticationService.forgotPass(this.forgotForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.loading = false;
                    this.flagDone = true;
                    //this.router.navigate(['/pages/login']);
                },
                error => {
                    this.loading = false;
                });
    }

}
