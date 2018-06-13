import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if(!items) return [];
        if(!searchText) return items;
        // console.log('search item');
        // console.log(searchText);
        // console.log(items);
        searchText = searchText.toLowerCase();
        return items.filter( it => {
            return JSON.stringify(it).toLowerCase().includes(searchText);
        });
    }
}