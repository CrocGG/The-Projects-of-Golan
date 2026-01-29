import { Router } from "express"
import validation from "../middlewares/validation"
import { login, signUp } from "../controllers/auth/controller"
import { createUser, userLogin } from "../controllers/auth/validator"

const router = Router()

router.post('/sign-up', validation(createUser, 1) ,signUp)
router.post('/login', validation(userLogin, 1), login)

export default router


