import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'object2array'
})
export class Object2arrayPipe implements PipeTransform {

  transform(value: any, args?: any): Array<any> {
    // console.log('pipe');
    let array = [];
    for (let i in value) {
      // console.log(i);
      if (value.hasOwnProperty(i)) {
        array.push(value[i])
      }
    }
    return array;
  }

}
