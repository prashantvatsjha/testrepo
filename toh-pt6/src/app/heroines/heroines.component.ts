import { Component, OnInit } from '@angular/core';

import { Heroine } from '../heroine';
import { HeroineService } from '../heroine.service';


@Component({
  selector: 'app-heroines',
  templateUrl: './heroines.component.html',
  styleUrls: ['./heroines.component.css']
})

export class HeroinesComponent implements OnInit{

heroines : Heroine[];

constructor(private heroineService: HeroineService){ }

 ngOnInit() {
    this.getHeroines();
  }

getHeroines(): void{

this.heroineService.getHeroines()
    .subscribe(heroines => this.heroines = heroines);
}

addHeroine(name:string): void {

name=name.trim();

if (!name){ return; }

this.heroineService.addHeroine({ name } as Heroine)
.subscribe(heroine => {
	this.heroines.push(heroine);	
})

}

deleteHeroine(heroine: Heroine): void{	
	this.heroineService.deleteHeroine(heroine).subscribe();
	this.heroines=this.heroines.filter(h => h !==heroine);
}



}