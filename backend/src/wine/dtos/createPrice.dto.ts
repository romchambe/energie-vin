
import { IsInt, IsOptional, Min, } from 'class-validator'

export class CreatePriceDto {
  @IsInt()
  @Min(0)
  amount: number

  @IsOptional()
  revisionDate: string
}
