import { Pipe, PipeTransform } from '@angular/core';

@Pipe({

  name: 'onlyEngLetters'

})

export class OnlyEngLettersPipe implements PipeTransform {

  transform(value: string): string {

    return value.replace(/[^a-zA-Z' ']/g, '');
  }

}
