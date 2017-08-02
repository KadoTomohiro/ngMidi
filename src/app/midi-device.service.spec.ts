import { TestBed, inject } from '@angular/core/testing';

import { MidiDeviceService } from './midi-device.service';

describe('MidiDeviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MidiDeviceService]
    });
  });

  it('should be created', inject([MidiDeviceService], (service: MidiDeviceService) => {
    expect(service).toBeTruthy();
  }));
});
