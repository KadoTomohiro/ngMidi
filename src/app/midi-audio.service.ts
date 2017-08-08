import { Injectable } from '@angular/core';
import { AudioService } from './audio.service';
import { MidiMessage } from './midi/midi-message';

@Injectable()
export class MidiAudioService {

  constructor(private audio: AudioService) {
  }

  send(msg: MidiMessage) {
    if (msg.statusNo === MidiMessage.NOTE_ON) {
      this.audio.on(this.frequency(msg));
    } else if (msg.statusNo === MidiMessage.NOTE_OFF) {
      this.audio.off(this.frequency(msg));
    }
  }

  frequency(midiMessage: MidiMessage): number {
    return 440.0 * Math.pow(2.0, (midiMessage.noteNo - 69.0) / 12.0);
  }
}
