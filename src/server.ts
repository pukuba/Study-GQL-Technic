import { ApolloServer, PubSub } from 'apollo-server-express'
import { readFileSync } from 'fs'
import { createServer } from 'http'
import dotenv from 'dotenv'
dotenv.config()
import app from "app"

// import responseCachePlugin from 'apollo-server-plugin-response-cache'
import { commentsLoader } from 'lib/dataloader'
import DB from 'config/connectDB'
import redis from 'config/connectRedis'
import depthLimit from 'graphql-depth-limit'
import { createComplexityLimitRule } from "graphql-validation-complexity"
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
        formatResponse: (res: any) => {
            return res
        },
        validationRules: [
            depthLimit(7),
            createComplexityLimitRule(1000, {
                onCost: (cost: Number) => console.log(`Query Cost : ${cost}`)
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

export default app