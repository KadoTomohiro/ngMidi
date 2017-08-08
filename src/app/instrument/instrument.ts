import { AudioTimbre } from './audio-timbre';

export class Instrument {
  private timberMap = new Map<number, AudioTimbre>();

  constructor(private context: AudioContext, private timber) {}

  on(frequency: number): void {

    console.log(`on:${frequency}`);

    if (this.timberMap.has(frequency)) {
      return;
    }
    const timber = new this.timber(this.context, frequency);
    timber.sing();
    this.timberMap.set(frequency, timber);
  }

  off(frequency: number): void {
    console.log(`off:${frequency}`);

    const timber = this.timberMap.get(frequency);
    if (timber) {
      timber.stop();
      this.timberMap.delete(frequency);
    }
  }
}
