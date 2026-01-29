import { CreateBucketCommand, S3Client } from '@aws-sdk/client-s3'
import config from 'config'

const s3Connection = JSON.parse(JSON.stringify(config.get<object>('s3.connection')))

const s3Client = new S3Client(s3Connection)

export async function createAppBucketIfNotExists() {
    try {
        await s3Client.send(
            new CreateBucketCommand({
                Bucket: config.get<string>('s3.bucket')
            })
        )
    }
    catch (error) {
        console.log(error)
    }
}

export default s3Client

