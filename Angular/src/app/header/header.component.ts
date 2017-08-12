import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
  }

  exportText: string = '';

  export() {
    this.exportText = window.localStorage.mangadata;
  }

  import(importData) {
    console.log(importData);
    // window.localStorage.mangadata=importData;
  }

}
