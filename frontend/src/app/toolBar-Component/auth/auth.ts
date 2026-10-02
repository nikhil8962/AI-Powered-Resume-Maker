import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';


import { MaterialDesignModule } from '../../material-design/material-design/material-design-module';
import { Snackbar } from '../../services/snackbar';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-auth',
  imports: [MaterialDesignModule, ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {

  isLoginMode = true;
  loading = false;
  hidePassword = true;
  hideConfirmPassword = true;

  loginForm: FormGroup;
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: Snackbar,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordsMatch });
  }

  passwordsMatch(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  switchMode(toLogin: boolean) {
    this.isLoginMode = toLogin;
  }

  async onLogin() {
    if (this.loginForm.invalid) return;
    this.loading = true;
    try {
      const response: any = await firstValueFrom(this.authService.login(this.loginForm.value));
      // Adjust 'token' to whatever field your backend actually returns
      if (response?.token) {
        localStorage.setItem('token', response.token);
      }
      this.snackbar.success('Logged in successfully');
      this.router.navigate(['/generate-resume']);
    } catch (error: any) {
      const message = error?.error?.message || 'Login failed. Please check your credentials.';
      this.snackbar.error(message);
    } finally {
      this.loading = false;
    }
  }

  async onSignup() {
    if (this.signupForm.invalid) return;
    this.loading = true;
    try {
      await firstValueFrom(this.authService.signup(this.signupForm.value));
      this.snackbar.success('Account created! Please log in.');
      this.isLoginMode = true;
      this.signupForm.reset();
    } catch (error: any) {
      const message = error?.error?.message || 'Signup failed. Please try again.';
      this.snackbar.error(message);
    } finally {
      this.loading = false;
    }
  }
}