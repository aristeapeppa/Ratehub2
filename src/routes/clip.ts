import { Router } from "express";
import ClipController from "../controllers/ClipController";

const router = Router();

//Get all clips
// router.get("/", ClipController.listAll);
router.get("/:id", ClipController.getOneById);

export default router;
