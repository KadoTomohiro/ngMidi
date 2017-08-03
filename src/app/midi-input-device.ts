import MIDIInput = WebMidi.MIDIInput;
import { Observable } from 'rxjs/Observable';

export class MidiInputDevice {
  device: MIDIInput;
  message: Observable<Uint8Array>;
}
