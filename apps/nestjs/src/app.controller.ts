import { Body, Controller, Get, Post } from '@nestjs/common';
import { GeoService } from './app.service';
import { GeoInfo, Points } from './app.dto';

@Controller('/geo')
export class GeoController {
  constructor(private readonly geoService: GeoService) {}

  @Post()
  async process_geo_info(@Body() points: Points): Promise<GeoInfo> {
    return await this.geoService.processPoints(points);
  }
}
