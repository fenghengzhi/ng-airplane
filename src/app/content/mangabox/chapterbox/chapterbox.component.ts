import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ChapterData} from "../../../MangaDatum";

@Component({
  selector: 'app-chapterbox',
  templateUrl: './chapterbox.component.html',
  styleUrls: ['./chapterbox.component.less']
})
export class ChapterboxComponent {
  @Input()
  public chapterData: ChapterData;
  @Output()
  private lastviewChange: EventEmitter<number> = new EventEmitter<number>();

  trackByFn(index, item: { title: string; url: string; }) {
    return item.url;
  }
}
