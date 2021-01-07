import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import expressPlayground from 'graphql-playground-middleware-express'
import DB from './config/connectDB'
import { readFileSync } from 'fs'
import { createServer } from 'http'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config()
import depthLimit from 'graphql-depth-limit'
const resolvers = require('./resolvers')
const typeDefs = readFileSync(path.join(__dirname, 'typeDefs.graphql'), 'utf-8')

import cors from 'cors'
const app = express()

app.use(cors())
const start = async () => {
    const db = await DB.get()

    const server = new ApolloServer({
        typeDefs,
        resolvers,

        context: () => {
            return {
                db
            }
        },
        validationRules: [
            depthLimit(7)
        ]
    })
    server.applyMiddleware({ app })

    app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

    const httpServer = createServer(app)
    httpServer.timeout = 5000
    httpServer.listen({ port: process.env.PORT }, () => {
        console.log(`GraphQL Server Running at http://localhost:${process.env.PORT}${server.graphqlPath}`)
    })
}

start()