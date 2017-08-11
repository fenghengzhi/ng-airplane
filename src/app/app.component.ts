import {Component, OnInit} from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  mangaData: {
    chapterdata: {
      author: string;
      brief: string;
      mangaurl: string;
      chapters: Array<{ title: string; url: string; }>;
    };
    coverurl: string;
    lastview: number;//下标
    name: string;
    time: number;//时间戳
  };
  mangalist: Array<string>;
  filterRule: { sortMethod: string; filterMethod: string; searchName: string; };
  title = 'app';
  dataSource: Observable<any>;

  constructor(public http: Http) {
    this.dataSource = this.http.get('/oldmanga/mangalist.txt').map(response=>response.text());
    this.dataSource.subscribe(data => this.mangalist = data.toString().trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n'));
  }

  ngOnInit() {

  }
}
