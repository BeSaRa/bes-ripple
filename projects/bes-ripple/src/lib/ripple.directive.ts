import {
  Directive,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  Optional,
  Renderer2,
} from '@angular/core'
import { DOCUMENT } from '@angular/common'
import {
  animate,
  AnimationBuilder,
  AnimationFactory,
  keyframes,
  style,
} from '@angular/animations'

@Directive({
  selector: '[besRipple]',
})
export class RippleDirective implements OnInit {
  private animationFactory!: AnimationFactory

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    @Optional() private animationBuilder: AnimationBuilder,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    if (!this.animationBuilder) {
      RippleDirective.logBrowserAnimationModuleMessage()
      return
    }

    this.renderer.setStyle(this.element.nativeElement, 'position', 'relative')
    this.renderer.setStyle(this.element.nativeElement, 'overflow', 'hidden')
    this.renderer.setStyle(this.element.nativeElement, 'cursor', 'pointer')

    this.animationFactory = this.animationBuilder.build([
      style({
        borderRadius: '50%',
      }),
      animate(
        '500ms linear',
        keyframes([
          style({
            pointerEvents: 'none',
            position: 'absolute',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            transform: 'scale(0)',
          }),
          style({
            pointerEvents: 'none',
            position: 'absolute',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            opacity: 0,
            transform: 'scale(4)',
          }),
        ])
      ),
    ])
  }

  @HostListener('click', ['$event'])
  onclick(e: MouseEvent): void {
    if (!this.animationBuilder) {
      RippleDirective.logBrowserAnimationModuleMessage()
      return
    }
    e.stopPropagation()
    const ripple: HTMLSpanElement = this.document.createElement('span')
    const target: HTMLElement = e.currentTarget as unknown as HTMLElement
    const diameter: number = Math.max(target.clientWidth, target.clientHeight)
    const oldRipple = target.querySelector('.ripple')
    oldRipple && oldRipple.remove()

    const radius: number = diameter / 2
    const left = e.clientX - (target.offsetLeft + radius)
    const top = e.clientY - (target.offsetTop + radius)
    ripple.style.width = ripple.style.height = `${diameter}px`
    ripple.style.left = `${left}px`
    ripple.style.top = `${top}px`
    ripple.classList.add('ripple')
    this.animationFactory.create(ripple).play()
    this.renderer.appendChild(this.element.nativeElement, ripple)
  }

  private static logBrowserAnimationModuleMessage(): void {
    console.error(
      'Please Provide the BrowserAnimationsModule to make the ripple effect works fine'
    )
  }
}

/**
 *
 * span.ripple {
 *   position: absolute;
 *   border-radius: 50%;
 *   transform: scale(0);
 *   animation: ripple 500ms linear;
 *   background-color: rgba(255, 255, 255, 0.7);
 *   pointer-events: none;
 * }
 *
 * @keyframes ripple {
 *   to {
 *     opacity: 0;
 *     transform: scale(4);
 *   }
 * }
 */
