import { Db } from 'mongodb'
import { commentsLoader } from '../lib/dataloader'
const Post = {
    id: (parent: any) => parent._id,
    comments: async (parent: any, args: void, { db }: { db: Db }) => {
        // const comment = await db.collection('comment').find({ postId: parent._id }).toArray()
        // return comment
        return commentsLoader().load(parent._id)
    }
}

const Comment = {
    id: (parent: any) => parent._id

}

export { Post, Comment }