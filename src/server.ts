import { ApolloServer, PubSub } from 'apollo-server-express'
import { readFileSync } from 'fs'
import { createServer } from 'http'
import dotenv from 'dotenv'
import app from "app"
dotenv.config()

// import responseCachePlugin from 'apollo-server-plugin-response-cache'
import { commentsLoader } from 'lib/dataloader'
import DB from 'config/connectDB'
import redis from 'config/connectRedis'
import depthLimit from 'graphql-depth-limit'

import resolvers from 'resolvers'
const typeDefs = readFileSync('src/typeDefs.graphql', 'utf-8')
const pubsub = new PubSub()

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
                },
                pubsub,
                redis
            }
        },
        // plugins: [responseCachePlugin()],
        validationRules: [
            depthLimit(7),
        ]
    })

    server.applyMiddleware({
        app,
        path: "/api"
    })

    const httpServer = createServer(app)
    server.installSubscriptionHandlers(httpServer)
    httpServer.timeout = 5000
    httpServer.listen({ port: process.env.PORT || 3333 }, () => {
        console.log(`GraphQL Server Running at http://localhost:${process.env.PORT}${server.graphqlPath}`)
    })
}

start()