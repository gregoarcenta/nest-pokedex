import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [HttpModule]
})
export class SeedModule {}
