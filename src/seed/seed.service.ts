import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { PokemonService } from '../pokemon/pokemon.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly httpService: HttpService,
    private pokemonService: PokemonService,
  ) {}

  async executeSeed(): Promise<string> {
    try {
      await this.pokemonService.removeAll();

      const response = await this.httpService.axiosRef.get<PokeResponse>(
        `https://pokeapi.co/api/v2/pokemon?limit=100&offset=0`,
      );
      
      await this.insertResultsPokemons(response.data);

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
