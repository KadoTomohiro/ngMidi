import { TestBed, inject } from '@angular/core/testing';

import { MidiAudioService } from './midi-audio.service';

describe('MidiAudioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MidiAudioService]
    });
  });

  it('should be created', inject([MidiAudioService], (service: MidiAudioService) => {
    expect(service).toBeTruthy();
  }));
});
