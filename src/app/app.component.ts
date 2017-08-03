import { Component } from '@angular/core';
import { MidiDeviceService } from './midi-device.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import MIDIInput = WebMidi.MIDIInput;
import { MidiInputDevice } from './midi-input-device';
import { MidiOutputDevice } from './midi-output-device';

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
      .then(() => {
        const allDevices = this.midi.midiDevices;
        this.inputs = allDevices.inputDevices;
        this.outputs = allDevices.outputDevices;

        const inDevice = this.inputs.find(input => input.device.name === 'Virtual MIDI Keyboard');
        const outDevice = this.outputs.find(output => output.device.name === 'MidiMock IN');

        inDevice.message.subscribe(data => {
          outDevice.device.send(Array.from(data));
        });

      });
  }

}
