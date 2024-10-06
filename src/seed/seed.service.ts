import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { PokemonService } from '../pokemon/pokemon.service';
import { IHttpAdapter } from '../common/interfaces/http-adapter.interface';

@Injectable()
export class SeedService {
  constructor(
    private readonly httpAdapter: IHttpAdapter,
    private pokemonService: PokemonService,
  ) {}

  async executeSeed(): Promise<string> {
    try {
      await this.pokemonService.removeAll();
      
      const response = await this.httpAdapter.get<PokeResponse>(
        `https://pokeapi.co/api/v2/pokemon?limit=500&offset=0`,
      );
      
      await this.insertResultsPokemons(response);

      return 'Seed Execute';
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  private async insertResultsPokemons(
    pokeResponse: PokeResponse,
  ): Promise<void> {
    const pokemons: Pokemon[] = pokeResponse.results.map(({ name, url }) => {
      const no = +url.split('/').at(-2);
      return { name, no };
    });

    await this.pokemonService.createMany(pokemons);
  }
}
