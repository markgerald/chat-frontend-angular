import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import {LoginService} from "./login.service";
import {ChatModel} from "../chat/chat.model";
import {UserModel} from "./user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  error: string = '';
  errorMessage: any;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loginService: LoginService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        data => {
          window.sessionStorage.setItem('token', data)
          this.router.navigate(['/chat']);
        },
        error => {
          this.error = 'Invalid email or password';
        }
      );
      //window.sessionStorage.setItem('sender', String(this.loginService.getUser()?.name))
    }
  }
}
