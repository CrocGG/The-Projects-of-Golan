import { NextFunction, Request, Response } from "express";

export default function responder(error:any, request: Request, response: Response, next: NextFunction) {
    response.status(error.status || 500).send(error.message || 'internal server error...')
}

