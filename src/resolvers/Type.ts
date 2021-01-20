import { Db } from 'mongodb'
import { Post, Comment, Loaders } from 'models/types'

const Post = {
    id: (parent: Post) => parent._id,
    comments: (parent: Post, args: void, { db, loaders }: { db: Db, loaders: Loaders }) => {
        return loaders.commentsLoader.load(parent._id)
    }
}

const Comment = {
    id: (parent: Comment) => parent._id

}

export { Post, Comment }