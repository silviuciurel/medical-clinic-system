import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  private message = new BehaviorSubject<String>('');
  castMessage = this.message.asObservable();

  sendMessage(message){
    this.message.next(message);
  }
}
