import {Component, Input, OnChanges} from '@angular/core';
import {MangaDatum} from "../MangaDatum";


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.less']
})
export class ContentComponent implements OnChanges {

  @Input()
  public mangaData: { [key: string]: MangaDatum; };
  @Input()
  public filter: { sortMethod: string; filterMethod: string; searchName: string; };


  constructor() {

  }

  ngOnChanges() {

  }


  trackByFn(index, item: MangaDatum) {
    return item.chapterdata.mangaurl; // or item.id
  }
}
