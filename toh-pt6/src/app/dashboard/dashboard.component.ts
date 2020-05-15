import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

import { Heroine } from '../heroine';
import { HeroineService } from '../heroine.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  heroines: Heroine[] = [];
  

  constructor(private heroService: HeroService, private heroineService: HeroineService) { }

  ngOnInit() {
    this.getHeroes();
    this.getHeroines();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
  
  
  getHeroines(): void{
  	this.heroineService.getHeroines()
  		.subscribe(heroines => this.heroines= heroines.slice(1,5));
  }
  
}
