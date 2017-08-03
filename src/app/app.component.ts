import { Component } from '@angular/core';
import { MidiDeviceService } from './midi-device.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import MIDIInput = WebMidi.MIDIInput;
import { MidiInputDevice } from './midi-input-device';
import { MidiOutputDevice } from './midi-output-device';
import { MidiDevices } from './midi-devices';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inputs: MidiInputDevice[];
  outputs: MidiOutputDevice[];

  constructor(private midi: MidiDeviceService) {
  }

  connect(): void {
    this.inputs = [];
    this.midi.connectMidiDevices()
      .then((midi: MidiDevices) => {
        this.inputs = midi.inputDevices;
        this.outputs = midi.outputDevices;
      });
  }

}
