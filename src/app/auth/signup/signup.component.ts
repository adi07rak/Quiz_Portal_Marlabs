import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  register: any = {};
  devDomainVar = false;
  wrongTraineeId = false;
  registered = false;
  confirmed : boolean;

  constructor(
    private authServe: AuthService,
    private comServe: CommonService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegister(data) {
    if (!data.devDomain || data.devDomain === '') {
      this.devDomainVar = true;
    } else {
      delete data.conPassword;
      console.log("data:::",data)
      this.authServe.registerUser(data).subscribe((res: any) => {
        console.log('data::::', res);
        this.comServe.showSuccess('Registered Successfully!', 'Success');
        this.registered = true;
      }, (error: any) => {
        console.log('getting error:::', error);
        if (error && !error.error.status && error.status === 409) {
          this.wrongTraineeId = true;
          document.getElementById('traineeId').focus();
          this.comServe.showWarning(error.error.message, error.statusText);
        } else {
          this.comServe.showError(error.error.message, error.statusText);
          this.register = {};
        }
      });
    }
  }

  onrouteToLogin(){
    this.router.navigate(['/auth']);
  }

  confirmPassword(event?: any) {
    // console.log('typing::::', event);
    if (this.register.password && this.register.password !== null ) {
      if (this.register.password === event.target.value) {
        this.confirmed = true;
        console.log('Bingo:::');
      } else {
        this.confirmed = false;
      }
    } else {
      this.confirmed = false;
    }
  }

}
