import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit, OnDestroy {

  notesData;
  submittedStudentNo;
  message;

  teacherName;
  teacherEamil;
  teacherProfileSub: Subscription;

  constructor(private notesService: NotesService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getNotes();
    this.teacherProfile();
  }

  getNotes() {
    this.notesService.getNotes().subscribe(
      (data:any) => {
        this.notesData = data.data;
        this.submittedStudentNo = data.length;
      }
    )
  }

  teacherProfile() {
    this.teacherProfileSub = this.authService.getProfile().subscribe(
      (response:any) =>{
        this.teacherName = response.data.name;
        this.teacherEamil = response.data.email;
      }
    )
  }
 
  onDelete(id) {
    this.notesService.deleteNote(id).subscribe(
      (data: any) => {
        this.getNotes();
      }
    )
  }

  onRefresh() {
    this.getNotes();
  }

  ngOnDestroy() {
    this.teacherProfileSub.unsubscribe();
  }
}
