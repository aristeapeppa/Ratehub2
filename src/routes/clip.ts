import { Router } from "express";
import ClipController from "../controllers/ClipController";

const router = Router();

router.get("/clip/:id", ClipController.getOneById);

export default router;
