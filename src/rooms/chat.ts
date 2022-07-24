import http from 'http'
import { Room, Client } from 'colyseus'
import { Logger } from '../utils/logger'
import { State } from './chatState'

export class Chat extends Room {
  // When room is initialized
  onCreate(options: any) {
    Logger.debug('Room created')
    this.setState(new State())
    this.onMessage('chat', (client: Client, message: string) => {
      if (this.state.users.has(client.sessionId))
        this.state.messages.push({ user: this.state.users.get(client.sessionId), message: message })
      this.broadcast('messages', this.state.messages)
    })
    this.onMessage('typing', (client: Client, message: string) => {
      this.broadcast('typing', { user: this.state.users.get(client.sessionId), message: message })
    })
  }

  // Authorize client based on provided options before WebSocket handshake is complete
  /*  onAuth(client: Client, options: any, request: http.IncomingMessage) {
    Logger.debug('Auth client: ')
    Logger.debug(client)
  } */

  // When client successfully join the room
  onJoin(
    client: Client,
    options: {
      name: string
    },
    auth: any,
  ) {
    Logger.debug('Client joined: ')
    Logger.debug(options.name)
    this.state.users.set(client.sessionId, options.name)
    this.broadcastUsers()
  }

  // When a client leaves the room
  onLeave(client: Client, consented: boolean) {
    Logger.debug('Client left: ')
    Logger.debug(this.state.users.get(client.sessionId))
    this.state.users.delete(client.sessionId)
    this.broadcastUsers()
  }

  broadcastUsers() {
    const connectedUsers: Array<string> = []
    this.state.users.forEach((user) => connectedUsers.push(user))
    this.broadcast('users', connectedUsers)
  }

  // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
  onDispose() {
    Logger.debug('Disposing room...')
  }
}
