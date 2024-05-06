import { HttpErrorResponse } from "@angular/common/http";
import { Planet, PlanetApiResponse } from "./models/planets.model";
import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { PlanetService } from "./services/planet.service";
import { delay } from "rxjs";

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
          //delay(2000),
          tapResponse<PlanetApiResponse, HttpErrorResponse>(
          (planetApiResponse: PlanetApiResponse) => {
            console.log("from store:", planetApiResponse.results)
            this.updatePlanets(planetApiResponse.results)},
          (error: HttpErrorResponse) => {
            console.log(error.name)
            this.updatePlanetsError(error)
          }
        ))
      });

}