import fileUpload from "express-fileupload"
import enforceAuth from "./middlewares/enforce-auth"
import notFound from "./middlewares/not-found"
import logger from "./middlewares/error/logger"
import sequelize from "./db/sequelize"
import express, { json } from 'express'
import responder from "./middlewares/error/responder"
import config from 'config'
import cors from 'cors'
import authRouter from './routers/auth'
import userRouter from './routers/user'
import vacationRouter from './routers/vacation'
import likerRouter from './routers/liker'
import { createAppBucketIfNotExists } from "./aws/aws"

const app = express()
const port = config.get<number>('app.port')
const appName = config.get<string>('app.name')
const secret = config.get<string>('app.secret')
console.log(`app secret is ${secret}`)
app.use(cors())
app.use(json())
app.use(fileUpload())
app.use('/', authRouter)
app.use(enforceAuth)
app.use('/user', userRouter)
app.use('/vacation', vacationRouter)
app.use('/liker', likerRouter)
app.use(notFound)
app.use(logger)
app.use(responder);
(async () => {
await sequelize.sync({ force: process.argv[2] === 'sync' })
await createAppBucketIfNotExists()
console.log(process.argv)
app.listen(port, () => console.log(`${appName} started on port ${port}`))
})()
