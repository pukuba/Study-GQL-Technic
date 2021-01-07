interface modelComment {
    postId: String
    author: String
    content: String
    _id: String
}

interface modelPost {
    author: String
    title: String
    content: String
    comments: Comment[]
    _id: String
}

export { modelPost, modelComment }