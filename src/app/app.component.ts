import { Component, OnInit } from '@angular/core';
import { MidiDeviceService } from './midi-device.service';
import 'rxjs/add/operator/map';
import { MidiInputDevice } from './midi-input-device';
import { MidiOutputDevice } from './midi-output-device';
import { MidiDevices } from './midi-devices';
import { MidiMessage } from './midi/midi-message';
import { MidiAudioService } from './midi-audio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  inputs: MidiInputDevice[];
  outputs: MidiOutputDevice[];

  constructor(private midi: MidiDeviceService, private midiAudio: MidiAudioService) {
  }

  ngOnInit(): void {
    this.connect();
  }

  connect(): void {
    this.inputs = [];
    this.midi.connectMidiDevices()
      .then((midi: MidiDevices) => {
        this.inputs = midi.inputDevices;
        this.outputs = midi.outputDevices;

        this.inputs[0].message.subscribe(msg => {
          const midiMessage = new MidiMessage(msg);
          this.midiAudio.send(midiMessage);
        });
      });
  }
}
