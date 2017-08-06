import { Injectable } from '@angular/core';

@Injectable()
export class AudioService {

  context = new AudioContext();
  destination = this.context.destination;
  private oscMap = new Map<number, OscillatorNode>();

  constructor() {
  }

  on(frequency: number) {
    console.log('note on');

    const osc: OscillatorNode = this.context.createOscillator();

    osc.connect(this.destination);

    osc.frequency.value = frequency;
    osc.start(0);

    this.oscMap.set(frequency, osc);
  }

  off(frequency: number) {

    const osc = this.oscMap.get(frequency);

    osc.stop(0);
  }

}
