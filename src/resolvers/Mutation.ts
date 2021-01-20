import { ApolloError, PubSub } from 'apollo-server-express'
import { RedisClient } from 'redis'

const chat = (parent: void, { author, content }: { author: String, content: String }, { pubsub, redis }: { pubsub: PubSub, redis: RedisClient }) => {
    const newChat = {
        author,
        content
    }
    pubsub.publish('chat', { newChat })
    redis.rpush('chat', JSON.stringify(newChat), (err, value) => {
        if (err) {
            throw new ApolloError("redis Queue rpush Error")
        }
        else {
            const loopCount = value - 5
            if (loopCount > 0) {
                redis.lpop('chat')
            }
        }
    })
    return newChat
}

export { chat }