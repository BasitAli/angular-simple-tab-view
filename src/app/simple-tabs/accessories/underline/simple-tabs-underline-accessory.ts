import {
  Component, Directive, OnInit, Input, Output, EventEmitter,
  ViewChild, ContentChild, ElementRef, TemplateRef, ViewEncapsulation, Renderer,
} from '@angular/core';

import { SimpleTabsComponent } from '../../simple-tabs';

@Component({
  selector: 'simple-tabs-underline-accessory',
  template: '<div #underline class="simple-tabs-underliner"></div>',
  styleUrls: ['./simple-tabs-underline-accessory.scss']
})
export class SimpleTabsUnderline {

  @Input() tabParent: SimpleTabsComponent;
  @ViewChild("underline") element: ElementRef;

  constructor(private renderer: Renderer) { }

  ngAfterViewInit() {
    this.onTabChanged(this.tabParent.activeTab);
    this.tabParent.onTabChanged.subscribe((index) => this.onTabChanged(index));
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
    this.renderer.setElementStyle(this.element.nativeElement, "width", `${rect.width}px`);
    this.renderer.setElementStyle(this.element.nativeElement, "transform", `translateX(${rect.left}px)`);
  }

}

