import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { Heroine } from './heroine';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Dr Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    
    const heroines = [
{id:1 ,name: 'Urmila Matondkar   ' },
{id:2 ,name: 'Manisha Koirala    ' },
{id:3 ,name: 'Madhoo 	Phool 	'    },
{id:4 ,name: 'Karisma Kapoor 	'    },
{id:5 ,name: 'Raveena Tandon 	'    },
{id:6 ,name: 'Ayesha Jhulka 	    '},
{id:7 ,name: 'Mamta Kulkarni 	'    },
{id:8 ,name: 'Divya Bharti 	    '},
{id:9 ,name: 'Kajol 	Bekhudi     '},
{id:10 ,name: 'Shilpa Shetty 	    '},
{id:11 ,name: 'Seema Biswas 	    '},
{id:12 ,name: 'Sonali Bendre 	    '},
{id:13 ,name: 'Tabu 			    '},
{id:14 ,name: 'Rituparna 		    '},
{id:15 ,name: 'Twinkle Khanna		'} 	
    ];
    
    return {heroes, heroines};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId<T extends Hero | Heroine>(myTable: T[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map(myTable => myTable.id)) + 1 : 1;
  }
  
 
  
}
