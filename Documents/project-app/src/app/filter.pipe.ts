import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(cities: any, goalText: string): any {
     console.log('dygefdah');
    if(!goalText){return cities;}
    let solution = cities.filter(v => {
      if(!v){return;}
      return v.toLowerCase().indexOf(goalText.toLowerCase())! === -1;
    })
    
   return solution;
  }

}
