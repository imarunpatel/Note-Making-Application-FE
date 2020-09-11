import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  isLoading = false;
  validationCheck = false;
  errorMsg: string;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.minLength(4),
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(5)
      ]],
      role: ['', [
        Validators.required
      ]]
    });
  }

  ngOnInit(): void {
    this.authService.isLoading.subscribe(
      (data) => {
        this.isLoading = data;
      }
    );

    this.authService.errorMsg.subscribe(
      (data) => {
        this.errorMsg = data;
      }
    )
  }

  get f() { return this.loginForm.controls; }

  onLogin() {
    this.validationCheck = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading = true;
    if(this.loginForm.value.role == 'student') {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
    } else {
      this.authService.loginTeacher(this.loginForm.value.email, this.loginForm.value.password);
    }
  }


}
