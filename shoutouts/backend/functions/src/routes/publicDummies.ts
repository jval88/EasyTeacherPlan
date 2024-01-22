import { Router } from "express"
import { getDummy, getDummies } from "../controllers/dummies"

const router = Router()

router.get("/", getDummies)
router.get("/:id", getDummy)

export default router
