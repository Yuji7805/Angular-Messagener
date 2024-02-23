import { TestBed } from '@angular/core/testing';

import { MessengerChatboxService } from './messenger-chatbox.service';

describe('MessengerChatboxService', () => {
  let service: MessengerChatboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessengerChatboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
