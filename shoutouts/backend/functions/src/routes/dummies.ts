import { Router } from "express"
import {
	postDummy,
	putDummy,
	deleteDummy
} from "../controllers/dummies"

const router = Router()

router.post("/", postDummy)
router.patch("/:id", putDummy)
router.delete("/:id", deleteDummy)

export default router
