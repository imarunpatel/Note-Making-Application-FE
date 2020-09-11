import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

const authUrl = environment.authUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private isAuthenticated = false;
  public isLoading = new Subject<any>();
  public errorMsg = new Subject<any>();
  private authStatusListener = new Subject<boolean>();

  constructor(
      private http: HttpClient,
      private router: Router
    ) { }

    getAuthStatusListener() {
      return this.authStatusListener.asObservable();
    }

  login(email: string, password: string) {
    const api = authUrl + '/login/'
    const authData = {email, password};
    return this.http.post(api, authData).subscribe(
      (response: any) => {
        this.token = response.token;
        let token = response.token;
        if (token) {
          this.isAuthenticated = true;
          localStorage.setItem('token', token);
          this.authStatusListener.next(true);
        }
        this.router.navigate(['studentDashboard'])
        this.isLoading.next(false);
      },
      (err) => {
        let msg = err.error.error;
        this.errorMsg.next(msg)
        this.isLoading.next(false);
      }
    )
  }

  loginTeacher(email: string, password: string) {
    const api = authUrl + '/login/teacher'
    const authData = {email, password};
    return this.http.post(api, authData).subscribe(
      (response: any) => {
        this.token = response.token;
        let token = response.token;
        if (token) {
          this.isAuthenticated = true;
          localStorage.setItem('token', token);
          this.authStatusListener.next(true);
        }
        this.isLoading.next(false);
        this.router.navigate(['teacherDashboard'])
      }
    )
  }

  registerUser(data) {
    const api = authUrl + '/register/';
    return this.http.post(api, data).subscribe(
      (response: any) => {
        this.token = response.token;
        let token = response.token;
        if (token) {
          this.isAuthenticated = true;
          localStorage.setItem('token', token);
        }
        this.isLoading.next(false);
        this.router.navigate(['studentDashboard'])
      },
      (err) => {
        let msg = err.error.error;
        this.errorMsg.next(msg)
        this.isLoading.next(false);
        this.router.navigate(['signup'])
      }
    )
  }

  getProfile() {
    const api =  authUrl + '/me/'
    return this.http.get(api);
  }

  doLogOut() {
    this.token = null;
    this.isAuthenticated = false;
    localStorage.removeItem('token');
    this.authStatusListener.next(false);
    this.router.navigate(['/login']);
  }

  verifyLoginStatus() {
    if (localStorage.getItem("token")) {
      this.isAuthenticated = true;
      this.authStatusListener.next(this.isAuthenticated);
    }
  }

}
