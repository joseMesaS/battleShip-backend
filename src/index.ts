import 'reflect-metadata'
import {createKoaServer} from 'routing-controllers'
import setupDb from './dbs'
import GamesController from './games/controller'


const app = createKoaServer({
  cors: true ,
  controllers: [ GamesController ]
})

setupDb()
  .then(_ =>
    app.listen(4000, () => console.log('Listening on port 4000'))
  )
  .catch(err => console.error(err))