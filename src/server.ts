import { ApolloServer, PubSub } from 'apollo-server-express'
import { readFileSync } from 'fs'
import { createServer } from 'http'
import dotenv from 'dotenv'
import app from './app'
dotenv.config()
import path from 'path'
// import responseCachePlugin from 'apollo-server-plugin-response-cache'
import { commentsLoader } from './lib/dataloader'
import DB from './config/connectDB'
import redis from './config/connectRedis'
import depthLimit from 'graphql-depth-limit'
import { createComplexityLimitRule } from 'graphql-validation-complexity'
import resolvers from './resolvers'
const typeDefs = readFileSync(path.join(__dirname, 'typeDefs.graphql'), 'utf-8')
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
            createComplexityLimitRule(10000, {
                onCost: cost => console.log('query cost: ', cost)
            })
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