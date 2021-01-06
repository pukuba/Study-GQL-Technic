import DataLoader from 'dataloader'
import { ObjectID } from 'mongodb'
import DB from '../config/connectDB'

const batchLoadFn = async (postIds: any) => {
    const db = await DB.get()
    const comments = await db.collection('comment').find({ postId: { $in: postIds } }).toArray()
    return postIds.map((id: ObjectID) => comments.filter((c: any) => c.postId + "" == id + ""))
}

export const commentsLoader = () => new DataLoader(batchLoadFn)