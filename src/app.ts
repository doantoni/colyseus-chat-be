import express from 'express'
import { createServer } from 'http'
import { gameLoader } from './loaders/game'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Connect your freakin game!')
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`)
})

gameLoader(app)
