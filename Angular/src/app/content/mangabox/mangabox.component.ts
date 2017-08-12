import {Component, Input, OnInit} from '@angular/core';
import {MangaDatum} from "../../MangaDatum";


@Component({
  selector: 'app-mangabox',
  templateUrl: './mangabox.component.html',
  styleUrls: ['./mangabox.component.less']
})
export class MangaboxComponent implements OnInit {
  @Input()
  public mangaDatum: MangaDatum;


  constructor() {
  }

  ngOnInit() {
    // console.log(this.mangaDatum);
  }

}
