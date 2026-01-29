import { NextFunction, Request, Response } from "express";
import config from 'config'
import User from "../models/User";
import { verify } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            currentUserId: string
        }
    }
}

export default function enforceAuth(request: Request, response: Response, next: NextFunction) {

    const jwtSecret = config.get<string>('app.jwtSecret')
    const authHeader = request.get('Authorization')
    if (!authHeader) return next({
        status: 401,
        message: 'missing Authorization header'
    })
    if (!authHeader.startsWith('Bearer')) return next({
        status: 401,
        message: 'missing Bearer keyword'
    })
    const jwtSections = authHeader.split(' ')
    const jwt = jwtSections[1]
    if (!jwt) return next({
        status: 401,
        message: 'missing jwt'
    })
    try {
        const user = verify(jwt, jwtSecret) as User 
        request.currentUserId = user.id
        console.log(user)
        next()
    }
    catch(error) {
        next({
            status: 401,
            message: 'invalid jwt'
        })
    }    
}

