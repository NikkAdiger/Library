import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upFirstLetter'
})

export class UpFirstLetterPipe implements PipeTransform {

  transform(value: string): string {

    const arr = value.split(' ');
    const arrres = [];

    arr.forEach((word) => {
      const letter = word.substr(0, 1).toUpperCase();
      const wordres = letter + word.substr(1);
      arrres.push(wordres);
    });

    return arrres.join(' ');
  }
}
