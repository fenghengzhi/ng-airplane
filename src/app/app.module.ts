import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { MangaboxComponent } from './content/mangabox/mangabox.component';
import { ChapterboxComponent } from './content/chapterbox/chapterbox.component';
import {HttpModule} from "@angular/http";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    MangaboxComponent,
    ChapterboxComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
