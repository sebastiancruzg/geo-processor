export interface Point {
  lat: number;
  lng: number;
}

interface Bound {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface GeoInfo {
  centroid: Point;
  bounds: Bound;
}
