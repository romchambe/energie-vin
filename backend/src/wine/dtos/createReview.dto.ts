
import { IsInt, IsString, Max, Min, } from 'class-validator'

export class CreateReviewDto {
  @IsString()
  author: string

  @IsInt()
  @Min(0)
  @Max(100)
  rating: number
}
