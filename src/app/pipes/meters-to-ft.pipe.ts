import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'metersToFt'
})
export class MetersToFtPipe implements PipeTransform {

  transform(value: number | undefined): string {

    const calculatedValue = (value) ? value * 3.28084 : 0;
    const feet = Math.floor(calculatedValue);
    const inches = Math.round((calculatedValue - feet) * 12);
    const formatedValue = `${feet}'${inches}" ft`;

    const result = (value) ? formatedValue : "???";

    return result.toString();
  }

}
