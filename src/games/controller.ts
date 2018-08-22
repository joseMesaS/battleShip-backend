import { JsonController, Param , Post, HttpCode,NotFoundError, BodyParam, Get } from 'routing-controllers'
import {Game, Player} from './entity'
import {generateBattleshipField, shot, pcShots} from '../gameLogic.js'

@JsonController()
export default class GamesController {

  @Post('/games')
  @HttpCode(201)
  async createGame () {
    const game = await Game.create({status: 'started'}).save()
    await Player.create({role: 'user', game, field: generateBattleshipField()}).save()
    await Player.create({role: 'pc', game, field: generateBattleshipField()}).save()
    
    return game.id
  }

  @Get('/games/:id')
  async getGame(
    @Param('id') id: number
  ) {
    const game = await Game.findOne(id)
    if (!game) throw new NotFoundError('Cannot find game!')

    const bot = await Player.findOne({role: 'pc', game})
    if (!bot) throw new NotFoundError('Cannot find player!')

    const player = await Player.findOne({role: 'user', game})
    if (!player) throw new NotFoundError('Cannot find player!')

    return {botField: bot.field, playerField: player.field}
  }
 
  @Post('/games/:id')
  async shot(
    @Param('id') id: number,
    @BodyParam('coord') coord: number[]
  ) {

    const game = await Game.findOne(id)
    if (!game) throw new NotFoundError('Cannot find game!')
    
    const bot = await Player.findOne({role: 'pc', game})
    if (!bot) throw new NotFoundError('Cannot find player!')

    const player = await Player.findOne({role: 'user', game})
    if (!player) throw new NotFoundError('Cannot find player!')

    const playerHit = shot(bot.field, coord)
    if (playerHit) {
      player.score = player.score + 1
    } 
  
    const botHit = pcShots(player.field)
    if (botHit) {
      bot.score = bot.score + 1
    }
    
    await bot.save()
    await player.save()

    return {playerField: player.field, playerHit, playerScore: player.score, botField: bot.field, botHit, botScore: bot.score }

  }
}