import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContentPagesRoutingModule } from "./content-pages-routing.module";

import { ErrorPageComponent } from "./error/error-page.component";
import { ForgotPasswordPageComponent } from "./forgot-password/forgot-password-page.component";
import { LockScreenPageComponent } from "./lock-screen/lock-screen-page.component";
import { LoginPageComponent } from "./login/login-page.component";
import { MaintenancePageComponent } from "./maintenance/maintenance-page.component";
import { RegisterPageComponent } from "./register/register-page.component";


@NgModule({
    imports: [
        CommonModule,
        ContentPagesRoutingModule,
        ReactiveFormsModule,
        FormsModule        
    ],
    declarations: [
        ErrorPageComponent,
        ForgotPasswordPageComponent,
        LockScreenPageComponent,
        LoginPageComponent,
        MaintenancePageComponent,
        RegisterPageComponent
    ]
})
export class ContentPagesModule { }
