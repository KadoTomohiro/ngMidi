import { AudioTimbre } from './audio-timbre';
import { InstrumentOscillatorNode } from './instrument-oscillator-node';
import { InstrumentGainNode } from './instrument-gain-node';
import { Envelope } from './envelope';

export class SampleTimbre implements AudioTimbre {

  private oscillators: InstrumentOscillatorNode[] = [];
  private gains: InstrumentGainNode[] = [];

  constructor(private context: AudioContext, frequency: number) {
    this.createOperatorSet(frequency, 1);
    this.createOperatorSet(frequency, 1.5);
    this.createOperatorSet(frequency, 0.5);

    const maxRelease = this.getMaxRelease(this.gains);
    this.setMaxRelease(maxRelease);
  }


  sing(): void {
    this.gains.forEach(gain => gain.on());
    this.oscillators.forEach(osc => osc.on());
  }

  stop(): void {
    this.gains.forEach(gain => gain.off());
    this.oscillators.forEach(osc => osc.off());
  }

  getMaxRelease(gains: InstrumentGainNode[]): number {
    return Math.max.apply(null, gains.map(gain => gain.envelope.release));
  }

  setMaxRelease(maxRelease: number) {
    this.oscillators.forEach(oscillator => {
      oscillator.maxRelease = maxRelease;
    });
  }

  createOperatorSet(frequency: number, ratio: number) {
    const carrierGainEnvelope: Envelope = {attack: 0, decay: 0.8, sustain: 0.2, release: 1};
    // const modulatorGainEnvelope: Envelope = {attack: 1, decay: 0.5, sustain: 0.1, release: 0.5};

    const modulator = new InstrumentOscillatorNode(this.context, frequency * 3 * ratio);
    const carrier = new InstrumentOscillatorNode(this.context, frequency * ratio);
    const modulatorGain = new InstrumentGainNode(this.context);
    const carrierGain = new InstrumentGainNode(this.context, carrierGainEnvelope);

    modulator.connect(modulatorGain);
    modulatorGain.connect(modulator);
    modulatorGain.connect(carrier);
    carrier.connect(carrierGain);
    carrierGain.connect(this.context.destination);

    this.oscillators.push(modulator);
    this.oscillators.push(carrier);
    this.gains.push(modulatorGain);
    this.gains.push(carrierGain);
  }

}
