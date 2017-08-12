import {Component, Input, OnInit} from '@angular/core';
import {ChapterData} from "../../../MangaDatum";

@Component({
  selector: 'app-chapterbox',
  templateUrl: './chapterbox.component.html',
  styleUrls: ['./chapterbox.component.less']
})
export class ChapterboxComponent implements OnInit {
  @Input()
  public chapterData: ChapterData;

  constructor() {

  }

  ngOnInit() {
    console.log(this.chapterData.chapters);
  }

  trackByFn(index, item: { title: string; url: string; }) {
    return item.url; // or item.id

  }
}
