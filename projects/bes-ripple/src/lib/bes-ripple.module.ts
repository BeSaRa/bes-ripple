import { NgModule } from '@angular/core'
import { RippleDirective } from './ripple.directive'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  declarations: [RippleDirective],
  imports: [BrowserAnimationsModule],
  exports: [BrowserAnimationsModule, RippleDirective],
})
export class BesRippleModule {}
