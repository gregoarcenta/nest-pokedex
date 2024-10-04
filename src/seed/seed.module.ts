import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { PokemonModule } from '../pokemon/pokemon.module';
import { IHttpAdapter } from '../common/interfaces/http-adapter.interface';
import { AxiosAdapter } from '../common/adapter/axios.adapter';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [SeedController],
  providers: [SeedService, { provide: IHttpAdapter, useClass: AxiosAdapter }],
  imports: [PokemonModule, HttpModule]
})
export class SeedModule {}
