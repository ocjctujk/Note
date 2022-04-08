import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}



  async setString(key: string, value: string) {
    await Storage.set({ key, value });
  }

  async getString(key: string): Promise<{ value: any }> {
    const ret = await Storage.get({key});
    console.log(ret.value);
    return JSON.parse(ret.value);
  }

  async removeItem(key: string) {
    await Storage.remove({ key });
  }

  async clear() {
    await Storage.clear();
  }
}
