import { LoginM } from '../../../models/Auth/login-m';
import { RegisterM } from '../../../models/Auth/register-m';
import { AuthURLs } from '../../../shared/helper/urls';
import { BaseServicesService } from './../shared/base-services.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private baseServicesService: BaseServicesService) {}

  login(model: LoginM) {
    return this.baseServicesService.PostRequest(AuthURLs.LOGIN, model);
  }

  Register(model: RegisterM) {
    return this.baseServicesService.PostRequest(AuthURLs.REGISTER, model);
  }
}
