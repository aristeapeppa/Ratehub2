import { Router } from "express";
import ClipController from "../controllers/ClipController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();

router.get("/", ClipController.homepageRender);
router.get("/clip/:id", ClipController.clipRender);
router.post("/clip/:id/rate", [checkJwt], ClipController.rate);
router.post("/clip/:id/report", [checkJwt], ClipController.report);
router.get("/clip/search/:wanted", ClipController.searchRender);


export default router;
