import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Heroine } from '../heroine';
import { HeroineService } from '../heroine.service';




@Component({
  selector: 'app-heroine-detail',
  templateUrl: './heroine-detail.component.html',
  styleUrls: [ '../hero-detail/hero-detail.component.css' ]
})

export class HeroineDetailComponent implements OnInit {

	@Input() heroine: Heroine;
	
	constructor(
		private route: ActivatedRoute,
		private heroineService: HeroineService,
		private location: Location 
	){}
	
	ngOnInit(): void {
		this.getHeroine();
	}
	
	
	getHeroine(): void{
		const id= +this.route.snapshot.paramMap.get('id');	
		this.heroineService.getHeroine(id)
			.subscribe(heroine => this.heroine = heroine);	
	}
	
	saveHeroine(): void{
		this.heroineService.updateHeroine(this.heroine)
			.subscribe(()=>this.goBack());
	}


	goBack(): void {
	    this.location.back();
	}


}