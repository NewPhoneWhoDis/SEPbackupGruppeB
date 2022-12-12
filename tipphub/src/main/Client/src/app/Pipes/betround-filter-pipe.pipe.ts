import { Pipe, PipeTransform } from '@angular/core';
import { Betround } from '../Model/Betround';

@Pipe({
  name: 'betroundFilterPipe'
})
export class BetroundFilterPipePipe implements PipeTransform {

  transform(betrounds: Betround[] | undefined, searchText: string | undefined): Betround[] | undefined {
    if(!betrounds) {
      return [];
    }
    if(!searchText) {
      return betrounds;
    }

    
    return betrounds.filter(betround => {
      return betround?.name?.toLocaleLowerCase() === searchText.toLocaleLowerCase();
    })
  }
}
