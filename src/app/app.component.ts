import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Http, ResponseContentType} from "@angular/http";
import 'rxjs/Rx';
import {MangaDatum} from "./MangaDatum";
import {createChangeDetectorRef} from "@angular/core/src/view/refs";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  public mangaData: { [key: string]: MangaDatum; } = {};
  public filter: { sortMethod: string; filterMethod: string; searchName: string; }
    = {sortMethod: "newfirst", filterMethod: "all", searchName: ""};
  public updateProcess: { current: number; total: number; } = {current: -1, total: 0};

  filterHandler(filter) {
    this.filter = filter;
  }

  updateHandler() {
    console.log('update');

    for (let mangaUrl in this.mangaData) {
      this.updateProcess.current = 0;
      this.http.get('/proxy', {
        params: {url: mangaUrl},
        responseType: ResponseContentType.Text
      }).map(response => response.text()).subscribe(data => {
        this.changeDetectorRef.detach();
        let $ = window['cheerio'].load(data);
        window['test'] = $;
        this.mangaData[mangaUrl].coverUrl = $('.am-img-thumbnail').attr('src');
        this.mangaData[mangaUrl].name = $('title').text();
        this.mangaData[mangaUrl].chapterData = this.mangaData[mangaUrl].chapterData || {
          author: undefined,
          brief: undefined,
          mangaUrl: undefined,
          chapters: []
        };
        this.mangaData[mangaUrl].chapterData.author = $('div.am-u-sm-8 > abbr:nth-child(3)').text();
        this.mangaData[mangaUrl].chapterData.brief = $('div.am-u-sm-8 > div').text();
        this.mangaData[mangaUrl].chapterData.mangaUrl = mangaUrl;
        let chapters = $('a.am-btn-secondary');
        if (this.mangaData[mangaUrl].chapterData.chapters.length !== chapters.length) {
          this.mangaData[mangaUrl].time = (new Date()).valueOf();//时间戳精确到毫秒
          this.mangaData[mangaUrl].chapterData.chapters = new Array(chapters.length);//集数信息
          for (let i = 0; i < chapters.length; ++i) {
            this.mangaData[mangaUrl].chapterData.chapters[i] = {
              url: chapters.eq(i).attr('href'),
              title: chapters.eq(i).text()
            };
          }
        }
        window.localStorage.mangaData = JSON.stringify(this.mangaData);
        ++(this.updateProcess.current);
        if (this.updateProcess.current === this.updateProcess.total) {
          this.mangaData = Object.assign({}, this.mangaData);
          this.updateProcess.current = -1;
        }
        this.changeDetectorRef.reattach();
        this.changeDetectorRef.detectChanges();
      });
    }
  }

  lastViewChangeHandler(value: { mangaUrl: string; lastView: number; }) {
    console.log(JSON.stringify(value));

    this.mangaData[value.mangaUrl].lastView = value.lastView;
    window.localStorage.mangaData = JSON.stringify(this.mangaData);
  }


  constructor(private http: Http, private changeDetectorRef: ChangeDetectorRef) {
    window['mangaData'] = this.mangaData;

    this.changeDetectorRef.detach();

    this.http.get('/oldmanga/mangalist.txt?' + Math.random(), {responseType: ResponseContentType.Text}).map(response => response.text())
      .subscribe(data => {
        let mangaList = data.toString().trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n')
        let mangaDataStore = JSON.parse(window.localStorage.mangaData || '{}');
        for (let mangaUrl of mangaList) {
          this.mangaData[mangaUrl] = mangaDataStore[mangaUrl] || {
            chapterData: {
              author: undefined,
              brief: undefined,
              mangaUrl: mangaUrl,
              chapters: []
            },
            coverUrl: undefined,
            lastView: undefined,
            name: undefined,
            time: undefined,
          };
        }
        this.updateProcess.total = mangaList.length;
        this.changeDetectorRef.reattach();

      });
  }
}
