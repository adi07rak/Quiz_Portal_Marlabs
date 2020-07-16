import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  environmentSub = environment;

  constructor(
    private http: HttpClient
  ) { }

  registerUser(data: any) {
    const path = this.environmentSub.auth.signup;
    return this.http.post(path, data);
  }

  authenticateUser(data: any) {
    const path = this.environmentSub.auth.login;
    return this.http.post(path, data);
  }

  updatePassword(data: any) {
    const path = this.environmentSub.auth.updatePass;
    return this.http.put(path, data);
  }

  getEmailToUpdate(data: any) {
    const path = this.environmentSub.auth.forgotPass;
    return this.http.put(path, data);
  }

}
