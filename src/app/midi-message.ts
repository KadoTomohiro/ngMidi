export class MidiMessage {

  static readonly NOTE_ON = 0x9;
  static readonly NOTE_OFF = 0x8;

  private _message: Uint8Array;

  constructor(message: Uint8Array) {
    this._message = message;
  }

  get status(): number {
    return this._message[0];
  }

  get statusNo(): number {
    // ステータスバイトの上位4bitがチャンネルNo
    // ex) 0x90 -> 1001 0000
    return (this.status & 0xf0) >> 4;
  }

  get channelNo(): number {
    // ステータスバイトの下位4bitがチャンネルNo
    // ex) 0x90 -> 1001 0000
    return this.status & 0xf;
  }

  get noteNo(): number {
    return this._message[1];
  }

  get velocity(): number {
    return this._message[2];
  }
  // TODO これは多分別の場所

}
