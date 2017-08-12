import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {MangaDatum} from "../MangaDatum";


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.less']
})
export class ContentComponent implements OnInit, OnChanges {
  // @Input()
  // private mangaData: Map<string, MangaDatum> = new Map();
  @Input()
  public mangaData: { [key: string]: MangaDatum; };

  constructor() {

  }

  ngOnChanges() {
    // this.mangaArray = [];
    // for (let mangaDatum of this.mangaData) {
    //   this.mangaArray.push(mangaDatum);
    // }
    // console.log(this.mangaArray.length);
// console.log('test')

  }

  ngOnInit() {

  }
  trackByFn(index, item:MangaDatum) {
    return item.chapterdata.mangaurl; // or item.id
  }
}
