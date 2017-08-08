export abstract class InstrumentNode {

  node: AudioNode;
  plug: AudioNode | AudioParam;
  connectTo: Array<InstrumentNode>;

  constructor() {
    this.connectTo = [];
  }

  abstract on(): void;

  abstract off(): void;

  connect(node: InstrumentNode | AudioNode): void {

    let connectedNode: AudioNode | AudioParam;

    if (node instanceof InstrumentNode) {
      connectedNode = node.plug;
    } else {
      connectedNode = node;
    }
    this.node.connect(connectedNode as AudioNode);
  }
}
