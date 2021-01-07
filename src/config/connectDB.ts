import env from './env'
import { MongoClient, Logger } from 'mongodb'

let db: any = null
let instance: number = 0
let logCount = 0;
const connectDB = () => {


    const connect = async () => {

        Logger.setCurrentLogger((msg, state) => {
            console.log(`MONGO DB REQUEST ${++logCount}: ${msg}`);
        });
        Logger.setLevel('debug');
        Logger.filter('class', ['Cursor']);
        try {
            const client = await MongoClient.connect(
                process.env.DB_HOST
                    ? process.env.DB_HOST
                    : env.DB_HOST
                , {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                })
            const _db = client.db()
            return _db
        } catch (e) {
            return e
        }
    }

    const get = async () => {
        try {
            ++instance
            console.log(`DB called ${instance} times`)

            if (db != null) {
                return db
            } else {
                console.log(`getting new db connection`)
                db = await connect()
                return db
            }
        } catch (e) {
            return e
        }
    }

    return { get }
}

export default connectDB()