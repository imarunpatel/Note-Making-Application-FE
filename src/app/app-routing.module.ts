import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './auth/login/login.component';
import { TeacherDashboardComponent } from './main/teacher-dashboard/teacher-dashboard.component';
import { StudentDashboardComponent } from './main/student-dashboard/student-dashboard.component';
import { SignupComponent } from './auth/signup/signup.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'studentDashboard', component: StudentDashboardComponent },
  { path: 'teacherDashboard', component: TeacherDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
