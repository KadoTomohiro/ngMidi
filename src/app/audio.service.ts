import { Injectable } from '@angular/core';
import { Harp } from './harp';

@Injectable()
export class AudioService {

  context = new AudioContext();
  harp = new Harp(this.context);

  constructor() {
  }

  on(frequency: number) {
    this.harp.on(frequency);

  }

  off(frequency: number) {
    this.harp.off(frequency);
  }

}
