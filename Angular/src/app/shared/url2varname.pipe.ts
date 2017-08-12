import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'url2varname'
})
export class Url2varnamePipe implements PipeTransform {

  transform(value: string, args?: any): string {
    return value.replace(/[.:/]/g,'');
  }

}
