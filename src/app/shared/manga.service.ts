import {Injectable, ChangeDetectorRef} from '@angular/core';
import {Http, ResponseContentType} from "@angular/http";
import {MangaDatum} from "./MangaDatum";

@Injectable()
export class MangaService {

  constructor(private http: Http, private changeDetectorRef: ChangeDetectorRef) {
  }

  initialMangaData(mangaData: { [key: string]: MangaDatum; }, updateProcess: { current: number; total: number; }) {
    this.changeDetectorRef.detach();
    this.http.get('/mangalist.txt?' + Math.random(), {responseType: ResponseContentType.Text}).map(response => response.text())
      .subscribe(data => {
        let mangaList = data.toString().trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n')
        let mangaDataStore = JSON.parse(window.localStorage.mangaData || '{}');
        for (let mangaUrl of mangaList) {
          mangaData[mangaUrl] = mangaDataStore[mangaUrl] || {
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
        updateProcess.total = mangaList.length;
        this.changeDetectorRef.reattach();
      });
  }

  updateManga(mangaData: { [key: string]: MangaDatum; }, updateProcess: { current: number; total: number; },refreshMangaData:Function) {
    updateProcess.current = 0;
    for (let mangaUrl in mangaData) {

      this.http.get('/proxy', {
        params: {url: mangaUrl},
        responseType: ResponseContentType.Text
      }).map(response => response.text()).subscribe(data => {
        this.changeDetectorRef.detach();
        let $ = window['cheerio'].load(data);
        // window['test'] = $;
        mangaData[mangaUrl].coverUrl = $('.am-img-thumbnail').attr('src');
        mangaData[mangaUrl].name = $('title').text();
        mangaData[mangaUrl].chapterData = mangaData[mangaUrl].chapterData || {
          author: undefined,
          brief: undefined,
          mangaUrl: undefined,
          chapters: []
        };
        mangaData[mangaUrl].chapterData.author = $('div.am-u-sm-8 > abbr:nth-child(3)').text();
        mangaData[mangaUrl].chapterData.brief = $('div.am-u-sm-8 > div').text();
        mangaData[mangaUrl].chapterData.mangaUrl = mangaUrl;
        let chapters = $('a.am-btn-secondary');
        if (mangaData[mangaUrl].chapterData.chapters.length !== chapters.length) {
          mangaData[mangaUrl].time = (new Date()).valueOf();//时间戳精确到毫秒
          mangaData[mangaUrl].chapterData.chapters = new Array(chapters.length);//集数信息
          for (let i = 0; i < chapters.length; ++i) {
            mangaData[mangaUrl].chapterData.chapters[i] = {
              url: chapters.eq(i).attr('href'),
              title: chapters.eq(i).text()
            };
          }
        }
        window.localStorage.mangaData = JSON.stringify(mangaData);
        ++(updateProcess.current);
        if (updateProcess.current === updateProcess.total) {
          updateProcess.current = -1;
        }
        refreshMangaData();
        this.changeDetectorRef.reattach();
        this.changeDetectorRef.detectChanges();
      });
    }
  }
}
