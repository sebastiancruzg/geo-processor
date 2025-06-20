import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { GeoInfo, Points } from './app.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class GeoService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private getCacheKey(points: Points): string {
    return points.points.map((point) => `${point.lat},${point.lng}`).join('|');
  }

  async processPoints(points: Points): Promise<GeoInfo> {
    const cacheKey = this.getCacheKey(points);
    const cachedData = await this.cacheManager.get<GeoInfo>(cacheKey);

    if (cachedData) {
      return cachedData;
    }
    try {
      const response = await lastValueFrom(
        this.httpService.post(process.env.FAST_GEO_SERVICE || 'http://localhost:8000/geo', points),
      );
      await this.cacheManager.set(cacheKey, response.data);
      return response.data;
    } catch (error) {
      if (error.code === 'ERR_INVALID_URL') {
        throw new HttpException(
          `Invalid URL: ${process.env.FASTSERVICE || 'http://localhost:8000/geo'}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      if (error.status > 300) {
        throw new HttpException(error.response?.data, error.status);
      }
      throw new HttpException(
        `Error processing points: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
