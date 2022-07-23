import { Logger } from '../utils/logger'
import { Express } from 'express'
import { createServer } from 'http'
import { Server } from 'colyseus'
import { Chat } from '../rooms/chat'

export const gameLoader = (app: Express): void => {
  Logger.info('Starting game server...')

  const server = createServer(app)

  const gameServer = new Server({
    server: server,
  })

  gameServer.define('chat', Chat)
  const colyseusPort = 2567
  gameServer.listen(colyseusPort)
  console.log(`Colyseus listening on ws://localhost:${colyseusPort}`)
}
