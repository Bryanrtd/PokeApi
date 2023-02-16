import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nocomma'
})
export class NocommaPipe implements PipeTransform {

  transform(value: any): any {
    if (value !== undefined && value !== null) {
      return value.toString().replace(/,/g, '');
    } else {
      return '';
    }
  }

}
