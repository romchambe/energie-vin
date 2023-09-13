import { Price } from 'src/wine/price.entity'
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

  @OneToOne(() => Price, { nullable: true })
  @JoinColumn()
  currentPrice: Price

  @OneToMany(() => Price, (price) => price.wine)
  prices: Price[]
}
