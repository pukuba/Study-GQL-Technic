import { Db } from 'mongodb'

const Post = {
    id: (parent: any) => parent._id,
    comments: async (parent: any, args: void, { db, loaders }: { db: Db, loaders: any }) => {
        // const comment = await db.collection('comment').find({ postId: parent.postId }).toArray()
        return loaders.commentsLoader.load(parent._id)
    },
    // comments: async (parent: any, args: void, { db }: { db: Db }) => {
    //     return await db.collection('comment').find({ postId: parent._id }).toArray()
    // }
}

const Comment = {
    id: (parent: any) => parent._id

}

export { Post, Comment }