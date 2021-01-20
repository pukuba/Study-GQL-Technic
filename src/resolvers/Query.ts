import { Db } from 'mongodb'
import { RedisClient } from 'redis'

const Posts = async (parent: void, args: void, { db }: { db: Db }) => {
    return await db.collection('post').find({}).toArray()
}

const recentChat = async (parent: void, args: void, { redis }: { redis: RedisClient }) => {
    return await new Promise(resolve => {
        redis.lrange('chat', 0, 4, (err, value: string[]) => {
            resolve(value.map((item: string) => JSON.parse(item)))
        })
    })
}

export { Posts, recentChat }