import DataLoader from 'dataloader'
import DB from 'config/connectDB'
import { Comment } from 'models/types'
const batchLoadFn = async (postIds: readonly String[]) => {
    const db = await DB.get()
    const comments = await db.collection('comment').find({ postId: { $in: postIds } }).toArray()
    return postIds.map((id: String) => comments.filter((c: Comment) => c.postId.toString() == id))
}

export const commentsLoader = () => new DataLoader(batchLoadFn)