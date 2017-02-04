import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { SimpleTabsComponent, SimpleTabsContent } from './simple-tabs/simple-tabs';
import { SimpleTabsUnderline } from './simple-tabs/accessories/underline/simple-tabs-underline-accessory';
import { SimpleTabsBackground } from './simple-tabs/accessories/background/simple-tabs-background-accessory';
import { SimpleTabsDots } from './simple-tabs/accessories/dots/simple-tabs-dots-accessory';

@NgModule({
  declarations: [
    AppComponent,
    SimpleTabsComponent,
    SimpleTabsContent,
    SimpleTabsUnderline,
    SimpleTabsBackground,
    SimpleTabsDots
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
