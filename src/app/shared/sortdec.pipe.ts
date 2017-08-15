import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sortdec'
})
export class SortdecPipe implements PipeTransform {

  transform(value: Array<any>, arg: string): Array<any> {
    value.sort((a, b) => {
      if (a[arg] > b[arg]) {
        return -1;
      }
      else if (a[arg] === b[arg]) {
        return 0;
      }
      else if (a[arg] < b[arg]) {
        return 1;
      }
    });
    return value;
  }

}
