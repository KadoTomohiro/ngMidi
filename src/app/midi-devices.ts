import MIDIOutput = WebMidi.MIDIOutput;
import MIDIInput = WebMidi.MIDIInput;
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import MIDIMessageEvent = WebMidi.MIDIMessageEvent;
import MIDIAccess = WebMidi.MIDIAccess;

export class MidiDevices {

  private inputs = new Map<string, { device: MIDIInput, message: Observable<Uint8Array>}>();
  private outputs = new Map<string, MIDIOutput>();

  constructor() {
  }

  get inputDeviceNames(): string[] {
    return Array.from(this.inputs.keys());
  }

  get outputDevicesNames(): string[] {
    return Array.from(this.outputs.keys());
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
    this.outputs.set(device.id, device);
  }

  getInputDevice(name: string): MIDIInput {
    return this.inputs.get(name).device;
  }

  midiMessage(name: string): Observable<Uint8Array> {
    return this.inputs.get(name).message;
  }

  getOutputDevice(name: string): MIDIOutput {
    return this.outputs.get(name);
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
