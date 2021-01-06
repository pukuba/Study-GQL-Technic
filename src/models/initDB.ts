import DB from '../config/connectDB'
import faker from 'faker'

const initDB = async () => {
    const db = await DB.get()
    const ls = await db.listCollections().toArray()
    for (const idx in ls) {
        await db.collection(ls[idx].name).drop()
    }
    const posts = []
    for (let i = 0; i < 100; i++) {
        const author = faker.name.firstName()
        const title = faker.name.title()
        const content = faker.lorem.text()
        posts.push({
            author,
            title,
            content
        })
    }
    const { insertedIds } = await db.collection('post').insertMany(posts)
    const comments = []
    for (const id in insertedIds) {
        const e = faker.random.number({
            'min': 10,
            'max': 50
        })
        for (let i = 0; i < e; i++) {
            const author = faker.name.firstName()
            const content = faker.lorem.text()
            comments.push({
                postId: insertedIds[id],
                author,
                content
            })
        }
    }
    await db.collection('comment').insertMany(comments)
    process.exit(0)
}

initDB()