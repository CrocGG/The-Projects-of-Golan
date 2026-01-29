import { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import Vacation from "../../models/Vacation";
import Liker from "../../models/Liker";

export async function getUsers(request: Request, response: Response, next: NextFunction) {
    try {
        const users = await User.findAll({ include: [Vacation] })
        response.json(users)
    }
    catch (error) {
        next(error)
    }
}

export async function extractVacations(request: Request, response: Response, next: NextFunction) {
    try {
        const { likedVacations } = await User.findOne({include: [Vacation] ,
            where: {
                id: request.currentUserId
            }
        })
        response.json(likedVacations)
    }
    catch (error) {
        next(error)
    }
}




