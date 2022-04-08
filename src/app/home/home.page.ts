import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonItemSliding, IonSlide } from '@ionic/angular';
import { Note } from '../shared/note.model';
import { StorageService } from '../shared/storage.service';
import { NoteService } from './note/note.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  notes: Note[];
  @ViewChild('ionSlidingItem') ionSlidingItem: IonItemSliding;
  ngOnInit(): void {
    this.fetchData();
    this.noteService.notesObs.subscribe((notesData) => {
      this.notes = [...notesData];
    });
  }
  constructor(
    private noteService: NoteService,
    private router: Router,
    private alertCtrl: AlertController,
    private storageService: StorageService
  ) {}

  onOpen(id: number) {
    this.router.navigate(['home', id]);
  }

  onCreate() {
    this.router.navigate(['home', 'note', 'new']);
  }

  fetchData() {
    let notes = [];
    this.storageService.getString('user').then((data: any) => {
      if (data) {
        for (let note of data) {
          notes.push(note);
        }
      }
      this.noteService.setNotes(notes);
    });
  }

  onDelete(id: number) {
    this.alertCtrl
      .create({
        header: 'Are you sure?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.noteService.deleteNote(id);
            },
          },
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              this.ionSlidingItem.closeOpened();
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  onSave() {
    console.log(this.notes);
    const stringValue = JSON.stringify(this.notes);
    this.storageService.setString('user', stringValue);
  }
}
