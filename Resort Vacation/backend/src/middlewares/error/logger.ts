import { NextFunction, Request, Response } from "express";

export default function logger(error: any, request: Request, response: Response, next: NextFunction) {
    console.log(error) 
    next(error)
}

