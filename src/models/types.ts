import DataLoader from 'dataloader'

interface Comment {
    postId: String
    author: String
    content: String
    _id: String
}

interface Post {
    author: String
    title: String
    content: String
    comments: Comment[]
    _id: String
}

interface Loaders {
    commentsLoader: DataLoader<String, any, String>
}


export { Post, Comment, Loaders }