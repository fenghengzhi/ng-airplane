import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ChapterData} from "../../../shared/MangaDatum";

@Component({
  selector: 'app-chapterbox',
  templateUrl: './chapterbox.component.html',
  styleUrls: ['./chapterbox.component.less']
})
export class ChapterboxComponent {
  @Input()
  public chapterData: ChapterData;
  @Output()
  public lastViewChange: EventEmitter<number> = new EventEmitter<number>();
  public isReverse = true;

  trackByFn(index, item: { title: string; url: string; }) {
    return item.url;
  }
}
