import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';


import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { ResetPassComponent } from '../reset-pass/reset-pass.component';
import { AuthService } from '../auth.service';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ResetPassComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'register', component: SignupComponent },
      { path: 'resetpass/:token', component: ResetPassComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]),
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
