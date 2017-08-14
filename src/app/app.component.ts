import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs";
import {MangaDatum} from "./MangaDatum";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  public mangaData: { [key: string]: MangaDatum; } = {};
  public filter: { sortMethod: string; filterMethod: string; searchName: string; }
    = {sortMethod: "newfirst", filterMethod: "all", searchName: ""};

  filterHandler(filter) {
    this.filter = filter;
    // console.log(this.filter);
  }

  updateHandler() {
  }

  updateProcess: number = -1;


  constructor(private http: Http, private changeDetectorRef: ChangeDetectorRef) {

    changeDetectorRef.detach();
    this.http.get('/oldmanga/mangalist.txt').map(response => response.text())
      .subscribe(data => {
        let mangaList = data.toString().trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n')
        let mangaDataStore = JSON.parse(window.localStorage.mangaData || '{}');
        for (let mangaUrl of mangaList) {
          this.mangaData[mangaUrl] = mangaDataStore[mangaUrl];
        }
        changeDetectorRef.reattach();

      });
  }
}
