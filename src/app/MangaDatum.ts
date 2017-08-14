export class MangaDatum {
  chapterdata: ChapterData;
  coverurl: string;
  lastview: number;//下标
  name: string;
  time: number;//时间戳
}

export class ChapterData {
  author: string;
  brief: string;
  mangaurl: string;
  chapters: Array<{ title: string; url: string; }>;
}
