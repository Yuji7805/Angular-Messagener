import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerChatboxService {

  constructor() { }

  private selectedSlideIndexSource = new Subject<number>();
  selectedSlideIndex$ = this.selectedSlideIndexSource.asObservable();

  // set selected slide index
  setSelectedSlideIndex(index: number) {
    this.selectedSlideIndexSource.next(index);
  }
}
