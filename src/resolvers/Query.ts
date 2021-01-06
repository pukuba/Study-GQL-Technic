import { Db } from 'mongodb'

const Posts = async (parent: any, args: any, { db }: { db: Db }) => {
    return await db.collection('post').find({}).toArray()
}

export { Posts }