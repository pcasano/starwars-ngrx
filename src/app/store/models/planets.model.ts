export interface Planet {
    name: string,
    rotation_period: number,
    orbital_period: number,
    diameter: number,
    climate: string,
    gravity: string,
    terrain: string,
    surface_water: number,
    population: number,
}


export interface PlanetApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Planet[];
  }