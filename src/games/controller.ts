import { JsonController, Get, Body, Param , Post, HttpCode, Put,NotFoundError,BadRequestError, BodyParam } from 'routing-controllers'
import Game from './entity'

@JsonController()
export default class GamesController {

 
}

// @Get('/games')
// async getGames() : Promise<gameList> {
//   const games = await Game.find()
//   return { games }
// }

// @Post('/games')
// @HttpCode(201)
// async createGame (
//   @BodyParam('name') name: string
//   ) : Promise<Game> {
//       // creating a new GameModel for validation purposes.
//       const newGame = new GameModel()
//       newGame.name = name
//       newGame.color =  colors[Math.floor(Math.random() * colors.length)]
//       newGame.board = defaultBoard
//       // if validation fail will throw an array of errors.
//       const validation : ValidationError[] = await validate(newGame,{ validationError: { target: false } })
//       if(validation.length > 0) throw new BadRequestError(JSON.parse(JSON.stringify(validation, null, 2)))
//       // if validation pass will create an entity of Game and save in DBS.
//       const game = await Game.create(newGame)
//       return game.save()
  
//   }


// @Put('/games/:id')
// async updateGame(
//   @Param('id') id: number,
//   @Body() update: Partial<Game>
//   ) : Promise<Game> {
//       // creating a new GameModel for validation purposes.
//       const updatedGame = new GameModel()
//       const game = await Game.findOne(id)
//       if (!game) throw new NotFoundError('Cannot find game!')
//       //setting properties of validation model to income updates otherwise using old properties of game
//       updatedGame.name = update.name ? update.name : game.name
//       updatedGame.color = update.color ? update.color : game.color
//       updatedGame.board = update.board ? update.board : game.board
//       // if validation fail will throw an array of errors.
//       const validation : ValidationError[] = await validate(updatedGame,{ validationError: { target: false } })
//       if(validation.length > 0) throw new BadRequestError(JSON.parse(JSON.stringify(validation, null, 2)))
//       //if validation pass and an update for board has been made will check if quantities of moves doesn't exceed of 1
//       if(update.board) {if ( moves(game.board,update.board) > 1) throw new BadRequestError('invalid quantitie of moves')}
//       //if validation pass and quiantity of moves is allowed will merge game with validation model.
//       return Game.merge(game, updatedGame).save() 
      
//   }