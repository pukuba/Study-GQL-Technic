import DB from 'config/connectDB'
import faker from 'faker'
import { loopPost, loopComment } from 'lib/lib'
import { ObjectID } from 'mongodb'

const createPost = () => {
    return {
        author: faker.name.firstName(),
        title: faker.name.title(),
        content: faker.lorem.text()
    }
}

const createComment = (postId: ObjectID) => {
    return {
        postId,
        author: faker.name.firstName(),
        content: faker.lorem.text()
    }
}

const initDB = async () => {
    const db = await DB.get()
    const ls = await db.listCollections().toArray()
    for (const idx in ls) {
        await db.collection(ls[idx].name).drop()
    }
    const posts = loopPost(300, createPost, [])
    const { insertedIds } = await db.collection('post').insertMany(posts)
    const comments = []
    for (const id in insertedIds) {
        const cnt = faker.random.number({
            'min': 1,
            'max': 5
        })
        comments.push(...loopComment(cnt, insertedIds[id], createComment, []))
    }
    await db.collection('comment').insertMany(comments)
    process.exit(0)
}

initDB()