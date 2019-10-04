import { Router } from "express";
import ClipController from "../controllers/ClipController";

const router = Router();

router.get("/clip/:id", ClipController.getOneById);
router.post("/clip/:id/rate", ClipController.rate);

export default router;
