import { Wine } from 'src/wine/wine.entity'
import {
  Entity, Column, PrimaryGeneratedColumn, BaseEntity, JoinColumn, ManyToOne,
} from 'typeorm'

@Entity()
export class Price extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  amount: number

  @Column({ nullable: false })
  revisionDate: Date

  @JoinColumn()
  @ManyToOne(() => Wine, { nullable: false })
  wine: Wine

}