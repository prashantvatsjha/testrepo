import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
 
 
import { Heroine } from '../heroine';
import { HeroineService } from '../heroine.service';


@Component({
  selector: 'app-heroine-search',
  templateUrl: './heroine-search.component.html',
  styleUrls: [ '../hero-search/hero-search.component.css' ]
})

export class HeroineSearchComponent implements OnInit {
  heroines$: Observable<Heroine[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroineService: HeroineService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroines$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroineService.searchHeroines(term)),
    );
  }
}