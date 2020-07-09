import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterImages'
})
export class FilterImagesPipe implements PipeTransform {

  transform(items: any[], filter: string): any {
    if (!items || !filter) {
      return items;
    }

    return items.filter(item => item.title.toLowerCase().includes(filter.toLowerCase()));
  }

}
