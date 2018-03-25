import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import cors from 'cors'

import db from './database'
import schema from './schema'
import context from './models'

const port = 5000
const app = express()

app.use('/graphql', cors(), bodyParser.json(), graphqlExpress({ schema, context }))

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.get('/api/hello', (req, res) => {
  res.send({ express: 'test from Express' })
})

app.listen(port, () => {
  console.log('서버가 시작되었습니다.!')
})
