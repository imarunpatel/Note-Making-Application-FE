import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  validationCheck = false;
  isLoading = false;
  errMsg;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.signupForm = this.fb.group({
      name: ['', [
        Validators.required
      ]],
      class: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });
  }

  ngOnInit(): void {
    this.authService.isLoading.subscribe(
      (data) => {
        this.isLoading = data;
      }
    )

    this.authService.errorMsg.subscribe(
      data => this.errMsg = data
    )
  }

  get f() { return this.signupForm.controls; }

  onSignup() {
    this.validationCheck = true;
    this.isLoading = true;
    if(this.signupForm.invalid) {
      return;
    }
    this.authService.registerUser(this.signupForm.value);

  }

}
