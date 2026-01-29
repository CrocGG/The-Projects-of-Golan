import { NextFunction, Request, Response } from "express"
import Liker from "../../models/Liker"

export async function getLikers(request: Request, response: Response, next: NextFunction) {
    try {
        const likers = await Liker.findAll()
        response.json(likers)
    }
    catch (error) {
        next(error)
    }
}

export async function createLiker(request: Request<{ id: string }>, response: Response, next: NextFunction) {
    try {
        const likingExists = await Liker.findOne({
            where: {
                userId: request.currentUserId,
                vacationId: request.params.id
            }
        })
        if (likingExists) throw new Error('liking already exists')

        const liker = await Liker.create({
            userId: request.currentUserId,
            vacationId: request.params.id
        })
        response.json(liker)
    }
    catch (error) {
        if (error.message === 'liking already exists') return next({
            status: 422,
            message: error.message
        })
        next(error)
    }
}

export async function annihilateLiker(request: Request<{ id: string }>, response: Response, next: NextFunction) {
    try {
        const liker = await Liker.findOne({
            where: {
                userId: request.currentUserId,
                vacationId: request.params.id
            }
        })
        if (!liker) throw new Error('liking not found')
        await liker.destroy()
        response.json({
            success: true
        })
    } catch (error) {
        console.log(error)
        if (error.message === 'liking not found') return next({
            status: 422,
            message: 'liking not found'
        })
        next(error)
    }
}

