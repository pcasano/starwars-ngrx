import { HttpErrorResponse } from "@angular/common/http";
import { Planet } from "./models/planets.model";
import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { PlanetService } from "./services/planet.service";

export interface PlanetState {
    planets: Planet[] | undefined | null;
    planetInProgress: boolean;
    planetError: HttpErrorResponse | undefined | null
  }
  
  export const initPlanetState: PlanetState = {
    planets: null,
    planetInProgress: true,
    planetError: null
  }

  @Injectable()
  export class PlanetStore extends ComponentStore<PlanetState> {

    constructor(private planetService: PlanetService) {
      super(initPlanetState);
    }

    readonly planets$ = this.select((state) => state.planets);
    readonly planetInProgress$ = this.select((state) => state.planetInProgress);
    readonly planetError$ = this.select((state) => state.planetError);

    private updatePlanets = this.updater((state: PlanetState, planets: Planet[]) => ({
        ...state,
        planets: planets,
        planetInProgress: false,
        planetError: null
      }))

      private updatePlanetsError = this.updater((state: PlanetState, error: HttpErrorResponse) => ({
        ...state,
        planets: null,
        planetInProgress: false,
        planetError: error
      }));

      readonly getPlanets = this.effect(() => {
        return this.planetService.getPlanets().pipe(
          tapResponse<Planet[], HttpErrorResponse>(
          (planets: Planet[]) => this.updatePlanets(planets),
          (error: HttpErrorResponse) => this.updatePlanetsError(error)
        ))
      });

}