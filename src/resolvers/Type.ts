import { Db } from 'mongodb'

const Post = {
    comments: async (parent: any, args: any, { db }: { db: Db }) => {
        const comment = await db.collection('comment').find({ postId: parent.postId }).toArray()
        return comment
    }
}

export { Post }