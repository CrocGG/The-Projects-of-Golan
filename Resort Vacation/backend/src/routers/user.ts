import { Router } from "express"
import { extractVacations, getUsers } from "../controllers/user/controller"

const router =  Router()
router.get('/', getUsers)
router.get('/vacation-liked', extractVacations)


export default router