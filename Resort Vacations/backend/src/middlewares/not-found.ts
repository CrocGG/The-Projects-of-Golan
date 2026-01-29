import { NextFunction, Request, Response } from "express";

export default function notFound(request: Request, response: Response, next: NextFunction) {
    next({
        status: 404,
        message: 'The thing you were looking for is not here'
    })
}


