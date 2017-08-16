import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MangaDatum} from "../shared/MangaDatum";


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.less']
})
export class ContentComponent {

  @Input()
  public mangaData: { [key: string]: MangaDatum; };
  @Input()
  public filter: { sortMethod: string; filterMethod: string; searchName: string; };
  @Output()
  public lastViewChange: EventEmitter<{ mangaUrl: string; lastView: number; }> = new EventEmitter<{ mangaUrl: string; lastView: number; }>();
  @Input()
  public updateProcess: { current: number; total: number; } = {current: -1, total: 0};

  trackByFn(index, item: MangaDatum) {
    return item.chapterData.mangaUrl; // or item.id
  }
}
