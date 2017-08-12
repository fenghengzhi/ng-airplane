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
  public mangaData: { [key: string]: MangaDatum; }={};
  // private mangaData: Map<string, MangaDatum> = new Map();
  private filterRule: { sortMethod: string; filterMethod: string; searchName: string; };

  constructor(private http: Http, private changeDetectorRef: ChangeDetectorRef) {
    changeDetectorRef.detach();
    this.http.get('/oldmanga/mangalist.txt').map(response => response.text())
      .subscribe(data => {
        let mangaList = data.toString().trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n')
        let mangaDataStore = JSON.parse(window.localStorage.mangaData || '{}');
        // for (let mangaUrl of mangaList) {
        //   this.mangaData.set(mangaUrl, mangaDataStore[mangaUrl]);
        //
        // }
        // this.mangaData={};
        for (let mangaUrl of mangaList) {
          this.mangaData[mangaUrl] = mangaDataStore[mangaUrl];
        }
        // changeDetectorRef.detectChanges();
        // changeDetectorRef.markForCheck();
        changeDetectorRef.reattach();

      });
  }
}
