import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {
  @Output()
  private filter: EventEmitter<{ sortMethod: string; filterMethod: string; searchName: string; }> = new EventEmitter<{ sortMethod: string; filterMethod: string; searchName: string; }>();

  @Output()
  private updateManga: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  public updateProcess: number = -1;

  constructor() {

  }

  onFilterChange(sortMethod: string, filterMethod: string, searchName: string) {
    // console.log(arguments)
    this.filter.emit({sortMethod: sortMethod, filterMethod: filterMethod, searchName: searchName});
  }

  exportText: string = '';

  export() {
    this.exportText = window.localStorage.mangaData;
  }

  import(importData) {
    window.localStorage.mangaData = importData;
  }

}
