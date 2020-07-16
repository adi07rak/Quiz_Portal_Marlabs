import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  token: any;
  authUser: boolean;
  environmentSub = environment;

  $authStatus = new BehaviorSubject(this.UserStatus());

  constructor(private toastr: ToastrService, private http: HttpClient) { }

  showSuccess(message, title) {
    this.toastr.success(message, title);
  }

  showError(message, title) {
    console.log("hello:::")
    this.toastr.error(message, title);
  }

  showInfo(message, title) {
    this.toastr.info(message, title);
  }

  showWarning(message, title) {
    this.toastr.warning(message, title);
  }

  updateUserStatus() {
    this.$authStatus.next(this.UserStatus());
  }

  UserStatus() {
    this.token = window.localStorage.getItem('tokenId');
    if (this.token) {
      return this.authUser = true;
    } else {
      return this.authUser = false;
    }
  }

  getAllTechnology() {
    const path = this.environmentSub.quiz.getalltechnology;
    return this.http.get(path);
  }
}
