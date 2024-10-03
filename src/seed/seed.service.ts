import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map, Observable } from 'rxjs';
import { PokeResponse, PokeResult } from './interfaces/poke-response.interface';
import { Pokemon } from '../pokemon/entities/pokemon.entity';

@Injectable()
export class SeedService {
  constructor(private readonly httpService: HttpService, ) {}

  executeSeed(): Observable<Pokemon[]> {
    return this.httpService
      .get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`)
      .pipe(
        map((res) => res.data.results),
        map(this.resultsToPokemonObject),
        catchError(({ message, status }) => {
          if (status === 404) throw new NotFoundException(message);
          throw new BadRequestException(message);
        }),
      );
  }

  private resultsToPokemonObject(results: PokeResult[]): Pokemon[] {
    return results.map(({ name, url }) => {
      const no = +url.split('/').at(-2)
      return { name, no };
    });
  }
}
