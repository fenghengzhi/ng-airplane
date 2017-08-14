import {BrowserModule} from '@angular/platform-browser';
import {ChangeDetectorRef, NgModule, ApplicationRef} from '@angular/core';

import {AppComponent} from './app.component';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HeaderComponent} from './header/header.component';
import {ContentComponent} from './content/content.component';
import {MangaboxComponent} from './content/mangabox/mangabox.component';

import {HttpModule} from "@angular/http";
import {ChapterboxComponent} from './content/mangabox/chapterbox/chapterbox.component';
import { Map2arrayPipe } from './shared/map2array.pipe';
import { Object2arrayPipe } from './shared/object2array.pipe';
import { Url2varnamePipe } from './shared/url2varname.pipe';
import { SortascPipe } from './shared/sortasc.pipe';
import { SortdecPipe } from './shared/sortdec.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    MangaboxComponent,
    ChapterboxComponent,
    Map2arrayPipe,
    Object2arrayPipe,
    Url2varnamePipe,
    SortascPipe,
    SortdecPipe,
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
