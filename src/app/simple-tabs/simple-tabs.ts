import {
  Component, Directive, OnInit, Input, Output, EventEmitter,
  ViewChild, ContentChild, ElementRef, TemplateRef, ViewEncapsulation, Renderer,
} from '@angular/core';

export class TabItemContext {
  constructor(public $implicit: any, public index: number = 0, public count: number = 0, public selected: boolean = false) { }

  get first(): boolean { return this.index === 0; }

  get last(): boolean { return this.index === this.count - 1; }

  get even(): boolean { return this.index % 2 === 0; }

  get odd(): boolean { return !this.even; }
}

@Component({
  selector: 'simple-tabs',
  template: `
  <ng-content></ng-content>
  <div #tabBody class="tab-body">
    <div *ngFor="let item of contextItems; let index = index" class="tab-item-body" (click)="handleClick(index)" [attr.data-index]="index">
      <template [ngIf]="template">
        <template [ngTemplateOutlet]="template" [ngOutletContext]="item"></template>
      </template>
      <template [ngIf]="!template">
        <div class="tab-bar-item">{{item.$implicit}}</div>
      </template>
    </div>
  </div>
  `,
  styleUrls: ['./simple-tabs.scss']
})
export class SimpleTabsComponent {

  @ViewChild("tabBody") tabBody;

  @Input() items: string[];
  @Output() onTabChanged = new EventEmitter<number>();

  contextItems = [];
  @ContentChild(TemplateRef) template;

  activeTab = 0;

  ngOnChanges(changes) {
    const count = this.items.length;
    this.contextItems = this.items.map((item, index) => {
      return new TabItemContext(item, index, count, index == this.activeTab);
    });
  }

  handleClick(index) {
    if( index == this.activeTab ) {
      return;
    }

    this.contextItems[this.activeTab].selected = false;
    this.activeTab = index;
    this.contextItems[this.activeTab].selected = true;
    this.onTabChanged.emit(index);
  }

  getElementAt(index): HTMLElement {
    return (this.tabBody.nativeElement as HTMLElement).children.item(index) as HTMLElement;
  }

}

@Directive({
  selector: '[simple-tabs-content]'
})
export class SimpleTabsContent {
  @Input() tabParent: SimpleTabsComponent;
  @Input() tabId: number;

  constructor(private renderer: Renderer, private elementRef: ElementRef) { }

  ngAfterViewInit() {
    this.onTabChanged(this.tabParent.activeTab);
    this.tabParent.onTabChanged.subscribe((index) => this.onTabChanged(index));
  }

  onTabChanged(index) {
    this.renderer.setElementStyle(this.elementRef.nativeElement, "display", index == this.tabId ? "block" : "none");
  }

}
