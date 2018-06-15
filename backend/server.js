import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import cors from 'cors'
import 'dotenv/config'

import db from './database'
import schema from './schema'
import models from './models'

const port = 5000
const app = express()

const CheckAuth = async (req, res, next) => {
  console.log(req.headers)
  next()
}

app.use('/graphql', cors(), CheckAuth, bodyParser.json(), graphqlExpress({ schema, context: { models } }))

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.get('/api/hello', (req, res) => {
  res.send({ express: 'test from Express' })
})

app.get('/register/confirm/:username', async (req, res) => {
  const { username } = req.params
  await models.User.update({ username }, { confirmed: true })
  res.send('ok')
})

app.listen(port, () => {
  console.log('서버가 시작되었습니다.!')
})
