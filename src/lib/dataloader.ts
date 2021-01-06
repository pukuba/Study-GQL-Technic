import DataLoader from 'dataloader'
import DB from '../config/connectDB'

const batchLoadFn = async (postIds: any) => {
    const db = await DB.get()
    console.log(postIds)
    const comments = await db.collection('comment').find({ postId: { $in: postIds } }).toArray()
    return postIds.map((id: String) => comments.filter((c: any) => c.postId == id))
}

export const commentsLoader = () => new DataLoader(batchLoadFn)