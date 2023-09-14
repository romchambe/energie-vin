import { Wine } from './wine.entity'
import {
  Entity, Column, PrimaryGeneratedColumn, BaseEntity, JoinColumn, ManyToOne,
} from 'typeorm'

@Entity()
export class Price extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  amount: number

  @Column({ nullable: true })
  revisionDate?: Date

  @JoinColumn()
  @ManyToOne(() => Wine, { nullable: false })
  wine: Wine

}