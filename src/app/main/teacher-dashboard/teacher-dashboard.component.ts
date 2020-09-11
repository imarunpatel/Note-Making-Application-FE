import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {

  notesData;
  submittedStudentNo;
  message;

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes() {
    this.notesService.getNotes().subscribe(
      (data:any) => {
        this.notesData = data.data;
        this.submittedStudentNo = data.length;
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

}
