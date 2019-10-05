import { Router } from "express";
import RatingController from "../controllers/RatingController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

router.get("/:clipId", [checkJwt], RatingController.getRating);

export default router;
