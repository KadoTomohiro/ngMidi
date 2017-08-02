import { Injectable } from '@angular/core';

import 'rxjs/add/observable/fromPromise';
import { MidiDevices } from './midi-devices';
import MIDIAccess = WebMidi.MIDIAccess;

@Injectable()
export class MidiDeviceService {

  midiDevices = new MidiDevices();

  constructor() {}

  connectMidiDevices(): Promise<void> {
    return window.navigator.requestMIDIAccess()
      .then((midiAccess: MIDIAccess) => {
        this.midiDevices.setMidiDevices(midiAccess);
      });
  }
}
