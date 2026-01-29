import Joi from "joi"

export const createLikerValidator = Joi.object({
    id: Joi.string().uuid()
})

export const annihilateLikerValidator = createLikerValidator