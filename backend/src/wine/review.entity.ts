import { Wine } from './wine.entity'
import {
  Entity, Column, PrimaryGeneratedColumn, BaseEntity, JoinColumn, ManyToOne,
} from 'typeorm'

@Entity()
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  rating: number

  @Column({ nullable: false })
  author: string

  @JoinColumn()
  @ManyToOne(() => Wine, { nullable: false })
  wine: Wine
}