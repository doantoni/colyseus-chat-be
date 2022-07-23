import { Schema, MapSchema, ArraySchema, type } from '@colyseus/schema'

export class State extends Schema {
  @type({ map: 'string' }) users = new MapSchema<string>()
  messages = new ArraySchema<object>()
}
