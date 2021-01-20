import { Post, Comment } from 'models/types'
import { ObjectID } from 'mongodb'

const loopPost = (x: number, todo: Function, obj: Post[]): Post[] => x ? loopPost(x - 1, todo, [...obj, todo()]) : obj
const loopComment = (x: number, postId: ObjectID, todo: Function, obj: Comment[]): Comment[] => x ? loopComment(x - 1, postId, todo, [...obj, todo(postId)]) : obj

export { loopPost, loopComment }