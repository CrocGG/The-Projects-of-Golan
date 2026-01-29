import { Router } from "express";
import { annihilateLiker, createLiker, getLikers } from "../controllers/liker/controller";
import validation from "../middlewares/validation";
import { annihilateLikerValidator, createLikerValidator } from "../controllers/liker/validator";

const router = Router()

router.get('/', getLikers)
router.post('/like-it/:id', validation(createLikerValidator, 2), createLiker)
router.delete('/hate-it/:id', validation(annihilateLikerValidator, 2), annihilateLiker)

export default router