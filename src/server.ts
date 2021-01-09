import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import expressPlayground from 'graphql-playground-middleware-express'
import { readFileSync } from 'fs'
import { createServer } from 'http'
import dotenv from 'dotenv'
import { invert } from 'lodash';
dotenv.config()
import path from 'path'
import queryMap from '../queries/queryMap'
// import responseCachePlugin from 'apollo-server-plugin-response-cache'
import bodyParser from 'body-parser'
import { commentsLoader } from './lib/dataloader'
import DB from './config/connectDB'
import depthLimit from 'graphql-depth-limit'
import resolvers from './resolvers'
const typeDefs = readFileSync(path.join(__dirname, 'typeDefs.graphql'), 'utf-8')
import cors from 'cors'
const app = express()
app.use(cors())
app.use(bodyParser.json())


app.use('/api', async (req, res, next) => {
    if (req.body.id) {
        const invertedMap = invert(queryMap)
        req.body.query = invertedMap[req.body.id]
    }
    next()
})
const start = async () => {
    const db = await DB.get()

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => {
            return {
                db,
                loaders: {
                    commentsLoader: commentsLoader(),
                }
            }
        },
        // plugins: [responseCachePlugin()],
        validationRules: [
            depthLimit(7)
        ]
    })

    server.applyMiddleware({
        app,
        path: "/api"
    })

    app.get('/graphql', expressPlayground({ endpoint: '/api' }))

    const httpServer = createServer(app)
    httpServer.timeout = 5000
    httpServer.listen({ port: process.env.PORT || 3333 }, () => {
        console.log(`GraphQL Server Running at http://localhost:${process.env.PORT}${server.graphqlPath}`)
    })
}

start()