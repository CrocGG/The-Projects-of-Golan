import { NextFunction, Request, Response } from "express";
import config from 'config'
import User from "../models/User";
import { verify } from "jsonwebtoken";
import Role from "../models/Role";

declare global {
    namespace Express {
        interface Request {
            currentRoleId: string
        }
    }
}

export default function specifiedEntrance(specifiedRole: string) {
    return async function (request: Request, response: Response, next: NextFunction) {
        const jwtSecret = config.get<string>('app.jwtSecret')
        const authHeader = request.get('Authorization')
        const jwtSections = authHeader.split(' ')
        const jwt = jwtSections[1]
        try {
            const user = verify(jwt, jwtSecret) as User
            request.currentRoleId = user.roleId
            const roles = await Role.findOne({
                where: { roleName: `${specifiedRole}` }
            })
            const specifiedId = roles.id
            if (request.currentRoleId !== specifiedId) return next({
                status: 403,
                message: `Entrance only to ${specifiedRole}s!`
            })
            console.log(user)
            next()
        }
        catch (error) {
            next(error)
        }
    }
}
