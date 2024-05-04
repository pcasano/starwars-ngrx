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

  planets: Planet[] | undefined | null = [];
  planetsInProgress = true;

  constructor(private readonly planetStore: PlanetStore) {}

  ngOnInit(): void {
    this.planetStore.planets$.subscribe(planets => this.planets = planets);
    this.planetStore.planetInProgress$.subscribe(planetsInProgress => this.planetsInProgress = planetsInProgress);
  }
}
