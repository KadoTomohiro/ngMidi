import MIDIOutput = WebMidi.MIDIOutput;
import MIDIInput = WebMidi.MIDIInput;
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import MIDIMessageEvent = WebMidi.MIDIMessageEvent;
import MIDIAccess = WebMidi.MIDIAccess;

export class MidiDevices {
  private inputs = new Map<string, { device: MIDIInput, message: Observable<MIDIMessageEvent> }>();
  private outputs = new Map<string, MIDIOutput>();

  constructor() {}

  get inputDeviceNames(): string[] {
    return Array.from(this.inputs.keys());
  }

  get outputDevicesNames(): string[] {
    return Array.from(this.outputs.keys());
  }

  addInputDevice(device: MIDIInput): void {
    console.log(this);
    this.inputs.set(device.name, {device: device, message: Observable.fromEvent(device, 'midimessage')});
  }

  addOutputDevice(device: MIDIOutput): void {
    this.outputs.set(device.name, device);
  }

  getInputDevice(name: string): MIDIInput {
    return this.inputs.get(name).device;
  }

  midiMessage(name: string): Observable<MIDIMessageEvent> {
    return this.inputs.get(name).message;
  }

  getOutputDevice(name: string): MIDIOutput {
    return this.outputs.get(name);
  }

  setMidiDevices(midiAccess: MIDIAccess) {
    midiAccess.inputs.forEach(input => {
      this.addInputDevice(input);
    });
    midiAccess.outputs.forEach(output => {
      this.addOutputDevice(output);
    });
  }
}
