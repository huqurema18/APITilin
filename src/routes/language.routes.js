import { Router } from "express";
import { methods as languageController } from "./../controllers/language.controller";


const router = Router();

router.get("/", languageController.getLanguages);
router.post("/", languageController.addLanguage);
router.delete("/:id", languageController.deleteLanguage);

export default router;