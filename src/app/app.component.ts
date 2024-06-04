import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlanetService } from './store/services/planet.service';
import { PlanetStore } from './store/planet.store';
import { Observable, Subscription, tap } from 'rxjs';
import { Planet } from './store/models/planets.model';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [PlanetStore],
})
export class AppComponent implements OnInit, OnDestroy{
  

  planetValue: string = '';

  userForm: FormGroup = new FormGroup({
    planet: new FormControl('',),
  });

  planets$: Observable<Planet[] | null | undefined>
  planetsInProgress$: Observable<boolean>
  planetError$: Observable<HttpErrorResponse | null | undefined>

  private dataSubscription: Subscription | undefined;

  constructor(
    private readonly planetStore: PlanetStore,
  ) {}

  ngOnInit(): void {
    this.dataSubscription = this.userForm.get('planet')?.valueChanges
    .pipe(
      debounceTime(1500),
      distinctUntilChanged())
    .subscribe(value => {
      // this.planetValue = value;

      // this.planetService.planet = this.planetValue;
      // console.log("from init: " + this.planetService.planet);

      this.planetStore.getPlanets(value);


    });

    this.planets$ = this.planetStore.planets$;
    this.planetsInProgress$ = this.planetStore.planetInProgress$;
    this.planetError$ = this.planetStore.planetError$;

  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
  }


}


