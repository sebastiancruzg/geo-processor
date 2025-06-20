import { Type } from 'class-transformer';
import { IsNumber, Min, Max, IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

export class Point {
  @IsNumber()
  @Min(-90)
  @Max(90)
  lat: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  lng: number;
}

export class Bounds {
  @IsNumber()
  north: number;

  @IsNumber()
  south: number;

  @IsNumber()
  east: number;

  @IsNumber()
  west: number;
}

export class Points {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Point)
  points: Point[];
}

export class GeoInfo {
  centroid: Point;
  bounds: Bounds;
}
