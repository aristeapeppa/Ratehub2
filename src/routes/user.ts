import { Router } from "express";
import UserController from "../controllers/UserController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

router.get("/register", UserController.registerRender);
router.post("/register", UserController.register);
router.get("/login", UserController.loginRender);
router.post("/login", UserController.login);

export default router;
