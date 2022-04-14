import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { BesRippleModule } from 'bes-ripple'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, BesRippleModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
