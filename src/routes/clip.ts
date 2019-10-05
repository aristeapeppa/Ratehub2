import { Router } from "express";
import ClipController from "../controllers/ClipController";

const router = Router();

router.get("/", ClipController.homepageRender);
router.get("/clip/:id", ClipController.getOneById);
router.post("/clip/:id/rate", ClipController.rate);
router.post("/clip/:id/rate", ClipController.rate);
router.get("/clip/search/:wanted", ClipController.searchRender);


export default router;
