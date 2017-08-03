import { Injectable } from '@angular/core';

import 'rxjs/add/observable/fromPromise';
import { MidiDevices } from './midi-devices';
import MIDIAccess = WebMidi.MIDIAccess;

@Injectable()
export class MidiDeviceService {

  constructor() {
  }

  connectMidiDevices(): Promise<MidiDevices> {
    const midiDevices = new MidiDevices();
    return window.navigator.requestMIDIAccess()
      .then((midiAccess: MIDIAccess) => {
        midiDevices.setMidiDevices(midiAccess);
        return midiDevices;
      });
  }
}
