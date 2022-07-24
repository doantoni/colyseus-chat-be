import { Logger } from '../utils/logger'
import { Express } from 'express'
import { createServer } from 'http'
import { Server } from 'colyseus'
import { Chat } from '../rooms/chat'
import { envVars } from '../config/env'

export const gameLoader = (app: Express): void => {
  Logger.info('Starting game server...')

  const server = createServer(app)

  const gameServer = new Server({
    server: server,
  })

  gameServer.define('chat', Chat)
  gameServer.listen(+(<string>envVars.app.port))
  console.log(`Colyseus listening on ws://localhost:${envVars.app.port}`)
}
