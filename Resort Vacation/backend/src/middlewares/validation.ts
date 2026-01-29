import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export default function validation(validator: ObjectSchema, contentNumeric: number) {
    return async function (request: Request, response: Response, next: NextFunction) {
        try {
            if (contentNumeric === 1) {
                request.body = await validator.validateAsync(request.body)
            }
            if (contentNumeric === 2) {
                request.params = await validator.validateAsync(request.params)
            }
            if (contentNumeric === 3) {
                request.files = await validator.validateAsync(request.files)
            }
            next()
        } catch (error) {
            next({
                status: 422,
                message: error.message
            })
        }
    }
}


   
