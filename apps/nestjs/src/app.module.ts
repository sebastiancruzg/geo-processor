import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GeoController } from './app.controller';
import { GeoService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [HttpModule, CacheModule.register()],
  controllers: [GeoController],
  providers: [GeoService],
})
export class AppModule {}
