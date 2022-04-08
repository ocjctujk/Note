import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {
  @ViewChild('f') form: NgForm;
  constructor(private noteService : NoteService,private router : Router) { }

  ngOnInit() {
  }

  onCreate(){
      this.noteService.addNote(this.form.value.title,this.form.value.note);
      this.router.navigate(['home']);
      this.form.reset();
  }

}
