import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { TeacherDashboardComponent } from './main/teacher-dashboard/teacher-dashboard.component';
import { StudentDashboardComponent } from './main/student-dashboard/student-dashboard.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'studentDashboard', component: StudentDashboardComponent, canActivate: [AuthGuard] },
  { path: 'teacherDashboard', component: TeacherDashboardComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
