import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MangaDatum} from "../../shared/MangaDatum";


@Component({
  selector: 'app-mangabox',
  templateUrl: './mangabox.component.html',
  styleUrls: ['./mangabox.component.less']
})
export class MangaboxComponent {
  @Input()
  public mangaDatum: MangaDatum;
  @Output()
  public lastViewChange: EventEmitter<{ mangaUrl: string; lastView: number; }> = new EventEmitter<{ mangaUrl: string; lastView: number; }>();
  public showCover = false;


}
