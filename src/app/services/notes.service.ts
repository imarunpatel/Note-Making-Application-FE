import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const notesUrl = environment.notesUrl;

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient) { }

  createNote(title: string, text: string) {
    const data = { title, text };
    const api = notesUrl;
    return this.http.post(api, data);
  }

  getNotes() {
    const api = notesUrl;
    return this.http.get(api);
  }

  deleteNote(id) {
    const api = `${notesUrl}/${id}`;
    return this.http.delete(api);
  }
}
