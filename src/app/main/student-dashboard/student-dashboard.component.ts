import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit, OnDestroy {

  noteForm: FormGroup;
  errMsg: string= null;
  isLoading = false;
  userProfileSub : Subscription;
  onSubmitNoteSub: Subscription;

  studentId;
  studentName;
  studentEmail;
  studentNote;
  
  constructor(
      private fb: FormBuilder,
      private notesService: NotesService,
      private authService: AuthService
    ) {
    this.noteForm = fb.group({
      title: ['', [
        Validators.required
      ]],
      text: ['', [
        Validators.required
      ]]
    })
  }

  ngOnInit(): void {
    this.userProfile();
  } 

  
  userProfile() {
    this.userProfileSub = this.authService.getProfile().subscribe(
      (response:any) =>{
        console.log(response);
        this.studentName = response.data.name;
        this.studentEmail = response.data.email;
        this.studentId = response.data._id;
        this.getStudentNotes();
      }
    )
  }

  getStudentNotes() {
    this.notesService.getNotes().subscribe(
      (response: any) => {
        response.data.forEach(item => {
          if(this.studentId == item.student._id)
            this.studentNote = item;
        })
        console.log(this.studentNote);
      }
    )
  }

  onSubmitNotes() {
    this.isLoading = true;
    if (this.noteForm.invalid) {
      return;
    }
    this.onSubmitNoteSub = this.notesService.createNote(this.noteForm.value.title, this.noteForm.value.text).subscribe(
      (data: any) => {
        if(data.success ==  true) {
          this.errMsg = 'Note has been successfully submitted';
          this.isLoading = false;
        }
      },
      (err) => {
        this.errMsg = err.error.error
        this.isLoading = false;
      }
    )
  }

  ngOnDestroy() {
    this.userProfileSub.unsubscribe();
  }

}
