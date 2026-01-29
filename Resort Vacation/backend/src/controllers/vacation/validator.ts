import Joi from "joi"

export const createVacationValidator = Joi.object({
    destination: Joi.string().required(),
    description: Joi.string().required(),
    beginningDate: Joi.date().greater('now').required(),
    endingDate: Joi.date().greater(Joi.ref('beginningDate')).required(),
    price: Joi.number().min(0).max(10000).required()
})

export const createVacationImageValidator = Joi.object({
    imageFile: Joi.object({
        mimetype: Joi.string().valid('image/jpeg', 'image/jpg', 'image/png', 'image/webp')
    }).unknown(true).required()
})

export const editVacationValidator = Joi.object({
    destination: Joi.string().required(),
    description: Joi.string().required(),
    beginningDate: Joi.date().required(),
    endingDate: Joi.date().greater(Joi.ref('beginningDate')).required(),
    price: Joi.number().min(0).max(10000).required(),
})

export const editVacationImageValidator = Joi.object({
    imageFile: Joi.object({
        mimetype: Joi.string().valid('image/jpeg','image/jpg', 'image/png', 'image/webp')
    }).unknown(true).optional()
})


export const annihilateVacationValidator = Joi.object({
    id: Joi.string().uuid().required()
})

export const editVacationValidatorParams = annihilateVacationValidator

export const extractUsersValidator = annihilateVacationValidator

export const getOneVacationValidator = annihilateVacationValidator