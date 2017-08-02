import { Component } from '@angular/core';
import { MidiDeviceService } from './midi-device.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import MIDIMessageEvent = WebMidi.MIDIMessageEvent;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  names: string[];
  selected: number;
  message: any;

  constructor(private midi: MidiDeviceService) {
  }

  connect(): void {
    this.midi.connectMidiDevices()
      .then(() => {
        this.names = this.midi.midiDevices.inputDeviceNames;
        this.midi.midiDevices.midiMessage(this.names[0])
          .subscribe(midiData => {
            this.message = midiData;
          });
      });
  }

}
