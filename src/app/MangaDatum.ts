export class MangaDatum {
  chapterData: ChapterData;
  coverUrl: string;
  lastView: number;//下标
  name: string;
  time: number;//时间戳
}

export class ChapterData {
  author: string;
  brief: string;
  mangaUrl: string;
  chapters: Array<{ title: string; url: string; }>;
}
