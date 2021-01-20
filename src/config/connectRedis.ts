import { createClient } from 'redis'

const redis = createClient()
redis.on('error', (err) => {
    console.log(err)
})
export default redis