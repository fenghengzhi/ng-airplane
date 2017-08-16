import {Component} from '@angular/core';
import 'rxjs/Rx';
import {MangaDatum} from "./shared/MangaDatum";
import {MangaService} from "./shared/manga.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [MangaService]
})
export class AppComponent {
  public mangaData: { [key: string]: MangaDatum; } = {};
  public filter: { sortMethod: string; filterMethod: string; searchName: string; }
    = {sortMethod: "newfirst", filterMethod: "all", searchName: ""};
  public updateProcess: { current: number; total: number; } = {current: -1, total: 0};

  constructor(private mangaService: MangaService) {
    this.mangaService.initialMangaData(this.mangaData, this.updateProcess);
  }

  filterHandler(filter) {
    this.filter = filter;
  }

  updateHandler() {
    // console.log('update');
    this.mangaService.updateManga(this.mangaData, this.updateProcess);
  }

  lastViewChangeHandler(value: { mangaUrl: string; lastView: number; }) {
    // console.log(JSON.stringify(value));

    this.mangaData[value.mangaUrl].lastView = value.lastView;
    window.localStorage.mangaData = JSON.stringify(this.mangaData);
  }

}
