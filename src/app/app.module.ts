import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MidiDeviceService } from './midi-device.service';
import { FormsModule } from '@angular/forms';
import { AudioService } from './audio.service';
import { MidiAudioService } from './midi-audio.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    MidiDeviceService,
    AudioService,
    MidiAudioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
