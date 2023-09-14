
import { IsInt, IsString, Max, Min, ValidateNested } from 'class-validator'
import { CreatePriceDto } from './createPrice.dto'
import { Type } from 'class-transformer'

export class CreateWineDto {
  @IsString()
  name: string

  @IsInt()
  @Min(1800)
  @Max(new Date().getFullYear())
  year: number

  @IsString()
  picture: string

  @ValidateNested()
  @Type(() => CreatePriceDto)
  currentPrice: CreatePriceDto
}
