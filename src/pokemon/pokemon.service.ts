import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon, PokemonDocument } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto): Promise<PokemonDocument> {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      return this.pokemonModel.create(createPokemonDto);
    } catch (error) {
      this.handleExceptions(error, this.create.name);
    }
  }

  async createMany(createPokemonDto: CreatePokemonDto[]) {
    await this.pokemonModel.insertMany(createPokemonDto);
    return 'All pokemon added';
  }

  async findAll(): Promise<PokemonDocument[]> {
    return this.pokemonModel.find();
  }

  async findOne(term: string): Promise<PokemonDocument> {
    let pokemon: PokemonDocument;
    try {
      if (!isNaN(+term)) {
        // Si es un no
        pokemon = await this.pokemonModel.findOne({ no: term });
      } else if (isValidObjectId(term)) {
        // Si es un mongoID
        pokemon = await this.pokemonModel.findById(term);
      } else {
        // Si es un name
        pokemon = await this.pokemonModel.findOne({
          name: term.toLowerCase().trim(),
        });
      }
      if (!pokemon) {
        throw new NotFoundException(
          `Pokemon with id, name or no: ${term} not found`,
        );
      }
      return pokemon;
    } catch (error) {
      throw error;
    }
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    try {
      if (updatePokemonDto.name) {
        updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
      }
      const pokemon: PokemonDocument = await this.findOne(term);
      await pokemon.updateOne(updatePokemonDto, { new: true });
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error, this.update.name);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

    if (!deletedCount) {
      throw new NotFoundException(`Pokemon with id ${id} not found`);
    }
    return `Pokemon with id ${id} removed`;
  }

  async removeAll() {
    await this.pokemonModel.deleteMany({});
    return 'All pokemon removed';
  }

  private handleExceptions(error: any, method: string) {
    if (!!error.response) throw error;

    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon already exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    throw new InternalServerErrorException(
      `Cannot ${method} Pokemon: ${error.code}`,
    );
  }
}
