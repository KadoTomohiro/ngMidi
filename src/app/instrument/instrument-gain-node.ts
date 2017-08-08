import { InstrumentNode } from './instrument-node';
import { Envelope } from './envelope';

export class InstrumentGainNode extends InstrumentNode {

  private _gain: GainNode;
  envelope: Envelope;

  constructor(private context: AudioContext,
              envelope: Envelope = {
                attack: 0,
                decay: 0,
                sustain: 1,
                release: 0
              }, gainValue: number = 1) {
    super();
    this._gain = context.createGain();
    this._gain.gain.value = gainValue;
    this.envelope = envelope;
  }

  get node(): AudioNode {
    return this._gain;
  }

  get plug(): AudioNode | AudioParam {
    return this._gain;
  }

  on(): void {
    const now = this.context.currentTime;
    const modulatorRootValue = this._gain.gain.value;  // Attackの目標値をセット
    this._gain.gain.cancelScheduledValues(0);      // スケジュールを全て解除
    this._gain.gain.setValueAtTime(0.0, now);      // 今時点を音の出始めとする
    this._gain.gain.linearRampToValueAtTime(modulatorRootValue, now + this.envelope.attack);
    // ▲ rootValue0までm_attack秒かけて直線的に変化
    this._gain.gain.linearRampToValueAtTime(this.envelope.sustain * modulatorRootValue, now + this.envelope.attack + this.envelope.decay);
    // ▲ m_sustain * modulatorRootValueまでm_attack+m_decay秒かけて直線的に変化
  }

  off(): void {
    const now = this.context.currentTime;
    const modulatorRootValue = this._gain.gain.value;
    this._gain.gain.cancelScheduledValues(0);
    this._gain.gain.setValueAtTime(modulatorRootValue, now);
    this._gain.gain.linearRampToValueAtTime(modulatorRootValue, now);
    this._gain.gain.linearRampToValueAtTime(0.0, now + this.envelope.release);
  }
}
