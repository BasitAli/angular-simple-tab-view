import {
  Component, Directive, OnInit, Input, Output, EventEmitter,
  ViewChild, ViewChildren, ElementRef, TemplateRef, ViewEncapsulation, Renderer,
} from '@angular/core';

import { SimpleTabsComponent } from '../../simple-tabs';

@Component({
  selector: 'simple-tabs-dots-accessory',
  template: `
  <div #dots class="simple-tabs-dots">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>`,
  styleUrls: ['./simple-tabs-dots-accessory.scss']
})
export class SimpleTabsDots {

  @Input() tabParent: SimpleTabsComponent;
  @ViewChild("dots") element: ElementRef;

  activeTab = -1;

  dotElements: HTMLElement[];

  readonly dotSize = 6;
  readonly dotPadding = 6;

  constructor(private renderer: Renderer) { }

  ngAfterViewInit() {
    this.dotElements = []
    const me = (this.element.nativeElement as HTMLElement);
    for(let i = 0; i < me.childElementCount; i++) {
      this.dotElements.push(me.children.item(i) as HTMLElement);
    }

    this.onTabChanged(this.tabParent.activeTab);
    this.tabParent.onTabChanged.subscribe((index) => this.onTabChanged(index));
  }

  private alignDotsToCenter(center, direction) {
    let start = center - ( 4 * this.dotSize + 3 * this.dotPadding ) / 2;
    this.dotElements.forEach((dot, index) => {
      const animationDelay = direction == 'right' ? 0.15 * (3 - index) : 0.15 * index;
      this.renderer.setElementStyle(dot, "transition-duration", `${0.2 + animationDelay}s`);
      this.renderer.setElementStyle(dot, "transform", `translateX(${start}px)`);
      start += this.dotSize + this.dotPadding;
    })
  }

  private getRect(el: HTMLElement) {
    let left = el.offsetLeft - el.scrollLeft;
    let top = el.offsetTop - el.scrollTop;
    let width = el.clientWidth;
    let height = el.clientHeight;
    return { top, left, height, width };
  }

  onTabChanged(index) {
    const element = this.tabParent.getElementAt(index);
    const rect = this.getRect(element);
    const center = rect.left + rect.width / 2;

    const direction = index < this.activeTab ? 'left' : 'right';
    this.alignDotsToCenter(center, direction);

    this.activeTab = index;
  }

}

