import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upFirstLetter'
})

export class UpFirstLetterPipe implements PipeTransform {

  transform(value: string): string {

    const array = value.split(' ');
    const arrayResult = [];

    array.forEach((word) => {
      arrayResult.push(word.substr(0, 1).toUpperCase() + word.substr(1));
    });

    return arrayResult.join(' ');
  }
}
