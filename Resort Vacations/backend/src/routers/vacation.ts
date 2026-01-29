import { Router } from "express";
import { annihilateVacation, createVacation, editVacation, extractUsers, getOneVacation, getVacationsActive, getVacationsEvery, getVacationsLiked, getVacationsUpcoming } from "../controllers/vacation/controller";
import validation from "../middlewares/validation";
import { annihilateVacationValidator, createVacationImageValidator, createVacationValidator, editVacationImageValidator, editVacationValidator, editVacationValidatorParams, extractUsersValidator, getOneVacationValidator } from "../controllers/vacation/validator";
import fileUploader from "../middlewares/file-uploader";
import specifiedEntrance from "../middlewares/specified-entrance";

const router = Router()
router.get('/vacation-manager', specifiedEntrance('manager') ,getVacationsEvery)
router.get('/vacation-normal/vacation-every', specifiedEntrance('normal') ,getVacationsEvery)
router.get('/vacation-normal/vacation-liked', specifiedEntrance('normal') ,getVacationsLiked)
router.get('/vacation-normal/vacation-upcoming', specifiedEntrance('normal') ,getVacationsUpcoming)
router.get('/vacation-normal/vacation-active', specifiedEntrance('normal') ,getVacationsActive)
router.get('/vacation-likers/:id', validation(extractUsersValidator, 2), extractUsers)
router.post('/vacation-add', specifiedEntrance('manager'), validation(createVacationValidator, 1), validation(createVacationImageValidator, 3), fileUploader, createVacation)
router.delete('/vacation-delete/:id', specifiedEntrance('manager'), validation(annihilateVacationValidator, 2), annihilateVacation)
router.patch('/vacation-edit/:id', specifiedEntrance('manager'), validation(editVacationValidatorParams, 2), validation(editVacationValidator, 1), validation(editVacationImageValidator, 3), fileUploader, editVacation)
router.get('/:id', validation(getOneVacationValidator, 2) , getOneVacation)

export default router
