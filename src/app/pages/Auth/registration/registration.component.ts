import { ToastService } from './../../../core/services/shared/toast.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../core/services/shared/language.service';
import { AuthService } from '../../../core/services/Auth/auth.service';
import { AppConstant } from '../../../shared/helper/app-constant';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { URLs } from '../../../shared/helper/urls';
import { Router } from '@angular/router';
import { RegisterM } from '../../../models/Auth/register-m';
import { UserRoles } from '../../../shared/helper/user-roles';
import { FieldMatchDirective } from '../../../shared/directives/field-match.directive';
import { OnlyNumbersDirective } from '../../../shared/directives/only-numbers.directive';
import { LocalStorageService } from '../../../core/services/shared/local-storage.service';

@Component({
  selector: 'app-registration',
  imports: [
    TranslatePipe,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FieldMatchDirective,
    OnlyNumbersDirective,
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  passwordStrengthStyle = {
    width: '0%',
    background: '#ef4444',
  };
  arLang = AppConstant.APP_Lang_AR;
  enLang = AppConstant.APP_Lang_EN;
  selectedLanguage = this.enLang;
  passwordStrength: number;
  passwordStrengthText: string;
  showPasswordbar = false;
  showPassword = false;

  constructor(
    private languageService: LanguageService,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private translateService:TranslateService,
    private localStorageService:LocalStorageService
  ) {
    this.registrationForm = new FormBuilder().group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      phoneNumber: ['', [Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      acceptedTerms: [false, Validators.requiredTrue],
    });
    this.passwordStrength = 0;
    this.passwordStrengthText = '';
    this.selectedLanguage = localStorageService.getValue(AppConstant.LANG_CODE);
    languageService.ChangeLang(this.selectedLanguage);
  }

  onLanguageChange(language: string): void {
    this.languageService.ChangeLang(language);
  }

  checkPasswordStrength(): void {
    //first show bar of strong
    this.showPasswordbar = true;
    const password = this.registrationForm.get('password')?.value ?? '';
    //validate
    if (password == '') {
      this.showPasswordbar = false;
      console.log('Password:', this.showPassword);
    }
    console.log('Password Strength Check Triggered');
    let strength = 0;

    if (password.length >= 8) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;

    this.passwordStrength = strength;
    this.passwordStrengthStyle.width = `${strength}%`;

    if (strength < 40) {
      this.passwordStrengthText = 'PASSWORD_STRENGTH.WEAK';
      this.passwordStrengthStyle.background = '#ef4444';
    } else if (strength < 80) {
      this.passwordStrengthText = 'PASSWORD_STRENGTH.MEDIUM';
      this.passwordStrengthStyle.background = '#f59e0b';
    } else {
      this.passwordStrengthText = 'PASSWORD_STRENGTH.STRONG';
      this.passwordStrengthStyle.background = '#10b981';
    }
  }

  goToLogin(): void {
    this.router.navigate([URLs.LOGIN]);
  }

  onSubmit(): void {
    console.log('Form Submitted', this.registrationForm.value);
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    const formData = this.registrationForm.value;
    var userM = {
      firstName: formData.firstname,
      lastName: formData.lastname,
      email: formData.email,
      address: formData.address,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      roles: [UserRoles.USER],
    } as RegisterM;

    console.log('User Model:', userM);
    this.authService.Register(userM).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.router.navigate([URLs.LOGIN]);
        this.toastService.success('Registration successful! Please log in.');
      },
      error: (error) => {
        console.error('Registration failed', error);
        this.toastService.error(error.error.message || 'Registration failed');
      },
    });
  }

  registerWithGoogle(): void {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  get isRtl(): boolean {
  return this.translateService.currentLang === AppConstant.APP_Lang_AR;
}
}
