import { PubSub } from 'apollo-server-express'

const newChat = {
    subscribe: (parent: void, args: void, { pubsub }: { pubsub: PubSub }) => {
        return pubsub.asyncIterator('chat')
    }
}

export { newChat }