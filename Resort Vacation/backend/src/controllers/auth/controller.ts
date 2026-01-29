import { createHmac } from "crypto"
import config from 'config'
import User from "../../models/User"
import { sign } from "jsonwebtoken"
import { NextFunction, Request, Response } from "express"

function saltAndPepperPassword(plainTextPassword: string): string {
    const secret = config.get<string>('app.secret')
    return createHmac('sha256', secret).update(plainTextPassword).digest('hex')
}

function jwtProcessor(response: Response, user: User) {
    const jwtSecret = config.get<string>('app.jwtSecret')
    const plainData = user.get({ plain: true })
    delete plainData.password
    const jwt = sign(plainData, jwtSecret)
    response.json({ jwt })
}

export async function signUp(request: Request, response: Response, next: NextFunction) {
    try {
        console.log(`plain password is ${request.body.password}`)
        request.body.password = saltAndPepperPassword(request.body.password)
        const user = await User.create(request.body)
        jwtProcessor(response, user)
    }
    catch (error) {
        next(error)
    }
}

export async function login(request: Request, response: Response, next: NextFunction) {
    try {
        const user = await User.findOne({
            where: {
                email: request.body.email,
                password: saltAndPepperPassword(request.body.password)
            }
        })
        if (!user) throw new Error('invalid email and/or password')
        jwtProcessor(response, user)
    } catch (error) {
        next(error)
    }
}