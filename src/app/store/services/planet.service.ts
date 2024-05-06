import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Planet, PlanetApiResponse } from '../models/planets.model';
import { map, delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PlanetService {
  private apiUrl = 'https://swapi.dev/api/planets/';

  constructor(private http: HttpClient) {}


  getPlanets(): Observable<PlanetApiResponse> {
    return this.http.get<PlanetApiResponse>(this.apiUrl).pipe(delay(2000));
  }

}