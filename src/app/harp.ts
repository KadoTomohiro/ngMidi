export class Harp {

  private nodesMap = new Map<number,
    {
      modulator1: OscillatorNode;
      modulator2: OscillatorNode;
      carrier1: OscillatorNode;
      carrier2: OscillatorNode;
    }>();

  constructor(private context: AudioContext) {
  }

  on(frequency: number) {
    const nodeSet = {
      modulator1: this.context.createOscillator(),
      modulator2: this.context.createOscillator(),
      carrier1: this.context.createOscillator(),
      carrier2: this.context.createOscillator()
    };
    nodeSet.modulator1.connect(nodeSet.carrier1.frequency);
    nodeSet.modulator1.connect(nodeSet.modulator1.frequency);
    nodeSet.modulator2.connect(nodeSet.carrier2.frequency);
    nodeSet.carrier1.connect(this.context.destination);
    nodeSet.carrier2.connect(this.context.destination);

    nodeSet.carrier1.frequency.value = frequency;
    nodeSet.carrier2.frequency.value = frequency;

    nodeSet.modulator1.start(0);
    nodeSet.modulator2.start(0);
    nodeSet.carrier1.start(0);
    nodeSet.carrier2.start(0);

    this.nodesMap.set(frequency, nodeSet);
  }

  off(frequency: number) {
    const nodeSet = this.nodesMap.get(frequency);
    nodeSet.modulator1.stop(0);
    nodeSet.modulator2.stop(0);
    nodeSet.carrier1.stop(0);
    nodeSet.carrier2.stop(0);
  }
}
