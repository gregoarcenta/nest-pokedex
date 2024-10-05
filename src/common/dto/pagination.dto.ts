import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationDto {
  // @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsPositive()
  limit?: number;

  // @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  @Min(0)
  offset?: number;
}
