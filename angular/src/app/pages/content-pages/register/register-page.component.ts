import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/auth/auth.service';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent {
    registerForm: FormGroup;    
    loading = false;
    submitted = false;
    
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthService
        ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }
    
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: ['', [Validators.required,, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }
    
    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    //  On submit click, reset field value
    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.signupUser(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.loading = false;
                    this.router.navigate(['/pages/login']);
                },
                error => {
                    this.loading = false;
                });
    }
}
