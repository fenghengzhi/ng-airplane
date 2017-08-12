import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'map2array'
})
export class Map2arrayPipe implements PipeTransform {

  transform(value: Map<string, any>, args?: any): any {
    let array = [];
    value.forEach((v, k) => {
      array.push(k);
    })
    // console.log(value);
    console.log(array);
    return array;
  }

}
