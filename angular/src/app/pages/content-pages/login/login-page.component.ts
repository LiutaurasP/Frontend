import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/auth/auth.service';
import { UserModel } from '../../../shared/auth/userModel';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {
    
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    flagDoneValidates = false;
    currentUser: UserModel;
    
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthService,
        ) {
        this.flagDoneValidates = false;
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }
    
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required,, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    
    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    //  On submit click, reset field value
    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.signinUser(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.currentUser = this.authenticationService.currentUserValue;
                    //Require validated email
                    if(!this.currentUser.isValidated){
                        this.flagDoneValidates = true;
                        this.authenticationService.logout();
                    }else{
                        this.router.navigate([this.returnUrl]);
                    }
                    this.loading = false;
                    this.submitted = false;
                },
                error => {
                    this.loading = false;
                    this.submitted = false;
                });
    }
}
