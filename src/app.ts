import express from 'express'
import expressPlayground from 'graphql-playground-middleware-express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { invert } from 'lodash';
import queryMap from '../queries/queryMap'
const invertedMap = invert(queryMap)
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', async (req, res, next) => {
    if (req.body.id) {
        req.body.query = invertedMap[req.body.id]
    }
    next()
})
app.get('/graphql', expressPlayground({ endpoint: '/api' }))

export default app