import { Injectable } from '@angular/core';
import { SampleTimbre } from './instrument/sample-timbre';
import { Instrument } from './instrument/instrument';

@Injectable()
export class AudioService {

  context = new AudioContext();
  harp = new Instrument(this.context, SampleTimbre);

  constructor() {
  }

  on(frequency: number) {
    this.harp.on(frequency);

  }

  off(frequency: number) {
    this.harp.off(frequency);
  }

}
