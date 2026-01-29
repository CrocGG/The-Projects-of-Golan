import { NextFunction, Request, Response } from "express";
import Vacation from "../../models/Vacation";
import User from "../../models/User";
import { Op } from 'sequelize'

export async function getVacationsEvery(request: Request, response: Response, next: NextFunction) {
    try {
        const vacations = await Vacation.findAll({ include: [User] })
        vacations.sort((a: Vacation, b: Vacation) => a.beginningDate > b.beginningDate ? 1 : -1)
        response.json(vacations)
    }
    catch (error) {
        next(error)
    }
}

export async function getVacationsLiked(request: Request, response: Response, next: NextFunction) {
    try {
        const { likedVacations } = await User.findOne({
            include: [Vacation],
            where: {
                    id: request.currentUserId
            }
        })
        likedVacations.sort((a: Vacation, b: Vacation) => a.beginningDate > b.beginningDate ? 1 : -1)
        response.json(likedVacations)
    }
    catch (error) {
        next(error)
    }
}

export async function getVacationsUpcoming(request: Request, response: Response, next: NextFunction) {
    try {
        const vacations = await Vacation.findAll({
            include: [User],
            where: {
                beginningDate: {
                    [Op.gte]: new Date()
                }
            }
        })
        vacations.sort((a: Vacation, b: Vacation) => a.beginningDate > b.beginningDate ? 1 : -1)
        response.json(vacations)
    }
    catch (error) {
        next(error)
    }
}

export async function getVacationsActive(request: Request, response: Response, next: NextFunction) {
    try {
        const vacations = await Vacation.findAll({
            include: [User],
            where: {
                beginningDate: {
                    [Op.lte]: new Date()
                },
                endingDate: {
                    [Op.gte]: new Date()
                }
            }
        })
        vacations.sort((a: Vacation, b: Vacation) => a.beginningDate > b.beginningDate ? 1 : -1)
        response.json(vacations)
    }
    catch (error) {
        next(error)
    }
}

export async function createVacation(request: Request, response: Response, next: NextFunction) {
    try {
        const newVacation = await Vacation.create({ ...request.body, imageUrl: request.imageUrl })
        await newVacation.reload({ include: [User] })
        response.json(newVacation)
    } catch (error) {
        next(error)
    }
}

export async function annihilateVacation(request: Request<{ id: string }>, response: Response, next: NextFunction) {
    try {
        const { id } = request.params
        const deletedRow = await Vacation.destroy({ where: { id } })
        if (deletedRow === 0) return next({
            status: 404,
            message: 'The vacation you wanted to delete is already gone and/or you had the wrong vacation ID...'
        })
        response.json({ success: true })
    } catch (error) {
        next(error)
    }
}

export async function editVacation(request: Request<{ id: string }>, response: Response, next: NextFunction) {
    try {
        const vacation = await Vacation.findByPk(request.params.id, { include: [User] });
        const { destination, description, beginningDate, endingDate, price } = request.body
        const { imageUrl } = request
        vacation.destination = destination
        vacation.description = description
        vacation.beginningDate = beginningDate
        vacation.endingDate = endingDate
        vacation.price = price
        vacation.imageUrl = imageUrl
        await vacation.save()
        response.json(vacation)
    } catch (e) {
        next(e)
    }
}

export async function extractUsers(request: Request<{ id: string }>, response: Response, next: NextFunction) {
    try {
        const { likers: users } = await Vacation.findByPk(request.params.id, {
            include: [User]
        })
        response.json(users)
    } catch (error) {
        next(error)
    }
}

export async function getOneVacation(request: Request<{ id: string }>, response: Response, next: NextFunction) {
    try {
        const vacation = await Vacation.findOne({
            where: {
                id: request.params.id
            },
            include: [User]
        })
        response.json(vacation)
    } catch (error) {
        next(error)
    }
}



