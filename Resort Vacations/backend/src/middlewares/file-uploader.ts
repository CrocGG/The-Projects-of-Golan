import { Upload } from "@aws-sdk/lib-storage";
import { randomUUID } from "crypto";
import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import s3Client from "../aws/aws";
import config from 'config'
import { extname } from "path";
import { Url } from "url";

declare global{
    namespace Express{
        interface Request{
            imageUrl: string
        }
    }
}

export default async function fileUploader(request: Request, response: Response, next: NextFunction) {
    try {
        if (!request.files) next()
        if (!request.files.imageFile) next()
        const { mimetype, data, name } = request.files.imageFile as UploadedFile
        const upload = new Upload({
            client: s3Client,
            params: {
                Bucket: config.get<string>('s3.bucket'),
                Key: `${randomUUID()}${extname(name)}`,
                ContentType: mimetype,
                Body: data
            }
        })
        const result = await upload.done()
        const url = new URL(result.Location)
        request.imageUrl = url.pathname
        next()
    }
    catch (error) {
        console.log(error)
    }
}

