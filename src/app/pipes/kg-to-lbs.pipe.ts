import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kgToLbs'
})
export class KgToLbsPipe implements PipeTransform {

  transform(value: number | undefined | null): number | string {
    const calculatedValue = (value) ? value * 2.20462 : 0;
    const formatedValue = (Math.round(calculatedValue * 100) / 100).toFixed(2);
    return value ? `${formatedValue} lbs` : "???";
  }

}
