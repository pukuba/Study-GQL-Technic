import { Db } from 'mongodb'

const Posts = async (parent: void, args: void, { db }: { db: Db }) => {
    return await db.collection('post').find({}).toArray()
}

export { Posts }