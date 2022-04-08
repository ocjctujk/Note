import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from 'src/app/shared/note.model';
import { StorageService } from 'src/app/shared/storage.service';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private _notes = [];
  notesObs = new BehaviorSubject<Note[]>(this._notes);
  constructor(private storageService: StorageService) {}

  setNotes(storedNotes: Note[]) {
    this._notes = [...storedNotes];
    this.notesObs.next(this._notes);
  }

  get notes() {
    return this.notesObs;
  }
  getNote(id: number) {
    return { ...this._notes.find((p) => p.id === +id) };
  }

  deleteNote(id: number) {
    this._notes = [...this._notes.filter((p) => p.id != +id)];
    this.notesObs.next(this._notes);
    this.storeNotes();
  }

  updateNote(id: number, newNoteText: string) {
    let note = this._notes.find((p) => p.id === +id);
    note.note = newNoteText;
    this.notesObs.next(this._notes);
    this.storeNotes();
  }

  addNote(title: string, noteText: string) {
    this._notes.push(new Note(this.getId(), title, noteText));
    this.notesObs.next(this._notes);
    this.storeNotes();
  }
  getId() {
    return Math.random();
  }

  storeNotes() {
    const stringValue = JSON.stringify(this._notes);
    this.storageService.setString('user', stringValue);
  }
}
