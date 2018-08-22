import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'

@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text',{nullable: true})
  status: string

  @OneToMany(_ => Player, player => player.game, {eager:true})
  players: Player[]

}

@Entity()
export class Player extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text')
  role: string

  @Column("json",{nullable: true})
  field: string[][]

  @Column({default: 0})
  score: number

  @ManyToOne(_ => Game, game => game.players)
  game: Game

}