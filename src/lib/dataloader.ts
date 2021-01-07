import DataLoader from 'dataloader'
import DB from '../config/connectDB'

const batchLoadFn = async (postIds: readonly String[]) => {
    const db = await DB.get()
    const comments = await db.collection('comment').find({ postId: { $in: postIds } }).batchSize(50000).toArray()
    return postIds.map((id: String) => comments.filter((c: any) => c.postId.toString() == id))
}

export const commentsLoader = () => new DataLoader(batchLoadFn)