import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {

  updatePass: any = {};
  confirmed = false;
  tokenURL: any = {};
  userId: any;
  updated= false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authServe: AuthService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      // console.log('token:::', data);
      if (data) {
        this.tokenURL = data;
      }
    });
    this.activatedRoute.queryParams.subscribe(data => {
      // console.log('id:::', data);
      if (data) {
        this.userId = data.id;
      }
    });
  }

  confirmPassword(event?: any) {
    // console.log('typing::::', event);
    if (event.target.id === 'password') {
      if (this.updatePass.conPassword && this.updatePass.conPassword !== null) {
        this.confirmed = false;
      }
    } else {
      if (this.updatePass.password && this.updatePass.password !== null) {
        if (this.updatePass.password === event.target.value) {
          this.confirmed = true;
        } else {
          this.confirmed = false;
        }
      } else {
        this.confirmed = false;
      }
    }
  }

  onUpdatePass(data: any) {
    const obj = { password: data.password, resetLink: this.tokenURL.token, _id: this.userId };
    // console.log('myceck:::', obj);
    this.authServe.updatePassword(obj).subscribe((res: any) => {
      // console.log('getting response after password update::::', res);
      if(res.status){
        this.updated = true;
      }
    }, (error: any) => {
      // console.log('getting error::::', error);
      this.router.navigate(['/auth']);
    });
  }

}
