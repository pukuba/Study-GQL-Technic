import { Db } from 'mongodb'

const Post = {
    comments: async (parent: any, args: void, { db, loaders }: { db: Db, loaders: any }) => {
        // const comment = await db.collection('comment').find({ postId: parent.postId }).toArray()
        return loaders.commentsLoader.load(parent.postId)
    }
}

export { Post }