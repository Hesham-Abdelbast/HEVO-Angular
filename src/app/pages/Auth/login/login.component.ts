import { Component } from '@angular/core';
import { AppConstant } from '../../../shared/helper/app-constant';
import { CommonModule, DOCUMENT } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../../core/services/shared/language.service';
import { AuthService } from '../../../core/services/Auth/auth.service';
import { Router } from '@angular/router';
import { LoginM } from '../../../models/Auth/login-m';
import { ToastService } from '../../../core/services/shared/toast.service';
import { URLs } from '../../../shared/helper/urls';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, TranslatePipe, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  arLang = AppConstant.APP_Lang_AR;
  enLang = AppConstant.APP_Lang_EN;
  selectedLanguage = this.enLang;
  loginForm!: FormGroup;
  showPassword: boolean = false;

  constructor(
    private languageService: LanguageService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService
  ) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onLanguageChange(language: string): void {
    this.languageService.ChangeLang(language);
  }

  NavToRegist(): void {
    this.router.navigate([URLs.REGISTER]);
  }

  onSignInClick() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const formData = this.loginForm.value;
    var loginUser = {
      email: formData.email,
      password: formData.password,
    } as LoginM;

    this.authService.login(loginUser).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.router.navigate([URLs.HOME]);
        this.toastService.success('Login successful! Enjoy your shopping.');
      },
      error: (error) => {
        console.error('Login failed', error);
        this.toastService.error(error.error.message || 'Login failed');
      },
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
