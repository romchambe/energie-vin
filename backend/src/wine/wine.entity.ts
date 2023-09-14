import { Review } from 'src/wine/review.entity'
import { Price } from './price.entity'
import {
  Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, JoinColumn, OneToOne,
} from 'typeorm'

@Entity()
export class Wine extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  year: number

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  picture: string

  @OneToOne(() => Price, { nullable: true, eager: true })
  @JoinColumn()
  currentPrice: Price

  @OneToMany(() => Price, (price) => price.wine)
  prices: Price[]

  @OneToMany(() => Review, (review) => review.wine)
  reviews: Review[]
}
