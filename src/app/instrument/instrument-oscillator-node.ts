import { InstrumentNode } from './instrument-node';

export class InstrumentOscillatorNode extends InstrumentNode {

  private _oscillator: OscillatorNode;
  maxRelease = 0;

  constructor(private context: AudioContext, frequency: number = 440) {
    super();
    this._oscillator = context.createOscillator();
    this._oscillator.frequency.value = frequency;
  }

  get plug(): AudioNode | AudioParam {
    return this._oscillator.frequency;
  }

  get node(): AudioNode {
    return this._oscillator;
  }

  on(): void {
    this._oscillator.start(0);
  }

  off(): void {
    const now = this.context.currentTime;
    this._oscillator.stop(now + this.maxRelease);
  }
}
