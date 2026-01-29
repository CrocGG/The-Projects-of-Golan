import Joi from "joi";
import User from "../../models/User";

async function checkIfEmailOccupied(email: string) {
    try {
        const foundUser = await User.findOne({
            where: {
                email
            }
        })
        if (foundUser) return foundUser
    }
    catch (error) {
        console.log(error)
    }
}

export const userLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()
})

export const createUser = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required().external(async (email) => {
        const isEmailInUse = await checkIfEmailOccupied(email);
        if (isEmailInUse) {
            throw new Error('email in use');
        }
    }),
    password: Joi.string().min(4).required()
})



