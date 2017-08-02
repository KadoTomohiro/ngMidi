import MIDIOutput = WebMidi.MIDIOutput;
import MIDIInput = WebMidi.MIDIInput;
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import MIDIMessageEvent = WebMidi.MIDIMessageEvent;
import MIDIAccess = WebMidi.MIDIAccess;
import { MidiMessage } from './midi-message';

export class MidiDevices {

  private readonly MIDI_MESSAGE_DATA_STATUS = 0;
  private readonly MIDI_MESSAGE_DATA_NOTE = 1;
  private readonly MIDI_MESSAGE_DATA_VELOCITY = 2;

  private inputs = new Map<string, { device: MIDIInput, message: Observable<MidiMessage> }>();
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
        return {
          status: e.data[this.MIDI_MESSAGE_DATA_STATUS],
          noteNo: e.data[this.MIDI_MESSAGE_DATA_NOTE],
          velocity: e.data[this.MIDI_MESSAGE_DATA_VELOCITY]
        };
      });
    this.inputs.set(device.name, {
      device: device,
      message: message
    });
  }

  addOutputDevice(device: MIDIOutput): void {
    this.outputs.set(device.name, device);
  }

  getInputDevice(name: string): MIDIInput {
    return this.inputs.get(name).device;
  }

  midiMessage(name: string): Observable<MidiMessage> {
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
