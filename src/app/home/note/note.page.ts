import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from 'src/app/shared/note.model';
import { NoteService } from './note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit {
  id = 0;
  note: Note;
  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.note = this.noteService.getNote(this.id);
  }

  onUpdate(newNoteText: string) {
    this.noteService.updateNote(this.id, newNoteText);
    this.router.navigate(['home']);
  }
}
