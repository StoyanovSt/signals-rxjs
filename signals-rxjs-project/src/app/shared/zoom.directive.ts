import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[zoom]',
  standalone: true,
})
export class ZoomDirective {
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);

  @HostListener('mouseenter') zoomIn() {
    this.scale(1.05);
  }

  @HostListener('mouseleave') zoomOut() {
    this.scale(1);
  }

  private scale(scaleFactor: number): void {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'transform',
      `scale(${scaleFactor})`
    );
  }
}
