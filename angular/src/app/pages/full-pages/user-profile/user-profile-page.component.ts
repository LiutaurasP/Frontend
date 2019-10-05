import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/auth/auth.service';
import { UserModel } from '../../../shared/auth/userModel';
import { first } from 'rxjs/operators';


@Component({
    selector: 'app-user-profile-page',
    templateUrl: './user-profile-page.component.html',
    styleUrls: ['./user-profile-page.component.scss']
})

export class UserProfilePageComponent implements OnInit {
    //Variable Declaration
    currentUser: UserModel;
    flagError: boolean;
    flagComplete: boolean;
    
    constructor(
        private router: Router,
        private authenticationService: AuthService
        ) {
        this.flagError = false;
        this.flagComplete = false;
        // redirect to home if already logged in
        if (!this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }else{
            this.currentUser = this.authenticationService.currentUserValue;
        }
    }

    ngOnInit() {
    }
    
    onPassSubmit(newpass : string, newpass2: string){
        this.flagError = false;
        this.flagComplete = false;
        if( newpass !== newpass2 || newpass.length < 6 || newpass2.length < 6){
            this.flagError = true;
        }else{
            this.currentUser.password = newpass;
            this.authenticationService.updatePass(this.currentUser)
                .pipe(first())
                .subscribe(
                    data => {
                        this.flagComplete = true;
                    },
                    error => {
                        this.flagError = true;
                    });
        }
    }
}