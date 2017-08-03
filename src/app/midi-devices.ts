import MIDIOutput = WebMidi.MIDIOutput;
import MIDIInput = WebMidi.MIDIInput;
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import MIDIMessageEvent = WebMidi.MIDIMessageEvent;
import MIDIAccess = WebMidi.MIDIAccess;
import { MidiInputDevice } from './midi-input-device';
import { MidiOutputDevice } from './midi-output-device';

export class MidiDevices {

  private inputs = new Map<string, MidiInputDevice>();
  private outputs = new Map<string, MidiOutputDevice>();

  constructor() {
  }

  get inputDeviceKeys(): string[] {
    return Array.from(this.inputs.keys());
  }

  get outputDevicesKeys(): string[] {
    return Array.from(this.outputs.keys());
  }

  get inputDevices(): MidiInputDevice[] {
    return Array.from(this.inputs.values());
  }

  get outputDevices(): MidiOutputDevice[] {
    return Array.from(this.outputs.values());
  }

  addInputDevice(device: MIDIInput): void {
    const message = Observable
      .fromEvent(device, 'midimessage')
      .map((e: MIDIMessageEvent) => {
        return e.data;
      });
    this.inputs.set(device.id, {
      device: device,
      message: message
    });
  }

  addOutputDevice(device: MIDIOutput): void {
    this.outputs.set(device.id, {device: device});
  }

  getInputDevice(name: string): MIDIInput {
    return this.inputs.get(name).device;
  }

  midiMessage(name: string): Observable<Uint8Array> {
    return this.inputs.get(name).message;
  }

  getOutputDevice(name: string): MIDIOutput {
    return this.outputs.get(name).device;
  }

  setMidiDevices(midiAccess: MIDIAccess) {
    this.inputs.clear();
    midiAccess.inputs.forEach(input => {
      this.addInputDevice(input);
    });
    this.outputs.clear();
    midiAccess.outputs.forEach(output => {
      this.addOutputDevice(output);
    });
  }
}
