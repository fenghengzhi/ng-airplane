import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MangaDatum} from "../../MangaDatum";


@Component({
  selector: 'app-mangabox',
  templateUrl: './mangabox.component.html',
  styleUrls: ['./mangabox.component.less']
})
export class MangaboxComponent {
  @Input()
  public mangaDatum: MangaDatum;
  @Output()
  private lastviewChange: EventEmitter<{ mangaurl: string; lastview: number; }> = new EventEmitter<{ mangaurl: string; lastview: number; }>();
  public showCover = false;

  lastviewChangeHandler(){}

}
