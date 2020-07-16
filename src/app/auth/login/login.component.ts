import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: any = {};
  wrongTraineeId = false;
  wrongPassword = false;
  forgotPassword = false;
  havetraineeId = false;
  forgotTraineeId: any;
  emailMessage = '';
  tryagain = false;

  constructor(
    private authServe: AuthService,
    private router: Router,
    private commonServe: CommonService
  ) { }

  ngOnInit() {
  }

  onLogin(data: any) {
    this.wrongTraineeId = this.wrongPassword = false;
    console.log('LOGIN::::', data);
    this.authServe.authenticateUser(data).subscribe((res: any) => {
      // console.log('response after login::::', res);
      if (res && res.status.traineeId && res.status.password && res.token) {
        window.localStorage.setItem('tokenId', res.token);
        this.commonServe.updateUserStatus();
        this.router.navigate(['/home']);
      }
    }, (error: any) => {
      // console.log('error after login::::', error);
      if (error && !error.error.status.traineeId) {
        this.wrongTraineeId = true;
        document.getElementById('traineeId').focus();
      } else {
        this.wrongPassword = true;
        document.getElementById('password').focus();
      }
    });
  }

  forgotPasswordHandler() {
    this.forgotPassword = !this.forgotPassword;
  }

  sentMail(data: any) {
    // console.log('my data:::', data);
    if (data && data.trim() !== null) {
      console.log('my data:::', data);
      this.authServe.getEmailToUpdate({ traineeId: data }).subscribe((res: any) => {
        if (res.status) {
          this.havetraineeId = true;
          this.emailMessage = res.message;
          this.tryagain = res.status;
        }
      }, (error: any) => {
        this.havetraineeId = true;
        this.emailMessage = error.error.message;
        this.tryagain = error.error.status;
        this.forgotTraineeId = '';
      });
    }
  }

}
