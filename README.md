# NgMidi

AngularでMidiデバイスを操作する

仮想MIDI inputデバイスはこちらを使用

https://github.com/mohayonao/virtual-midi-keyboard

## メモ

### WebMidiの型情報を取得

@typesのインストール
```
$ npm i -D @types/webmidi
```

tsconfigを編集
`/src/tsconfig.app.json`
```
    "types": [
      "webmidi"
    ]
```

`/src/tsconfig.spec.json`
```
    "types": [
      "jasmine",
      "node",
      "webmidi"
    ]
```