import { Component, OnInit } from '@angular/core';
import { PlanetService } from './store/services/planet.service';
import { PlanetStore } from './store/planet.store';
import { Observable } from 'rxjs';
import { Planet } from './store/models/planets.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [PlanetStore],
})
export class AppComponent implements OnInit {

  planets$ = this.planetStore.planets$;
  planetsInProgress$ = this.planetStore.planetInProgress$;
  planetError$ = this.planetStore.planetError$;


  constructor(private readonly planetStore: PlanetStore) {}


    title = 'starwars-ngrx';


  ngOnInit(): void {


    this.planetStore.planets$.subscribe(planet => console.log(planet));


  }





}
