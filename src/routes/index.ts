import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import clip from "./clip";
import homepage from "./homepage";

const routes = Router();

routes.use("/user", user);
routes.use("/", clip);

// ----------------------------------------------

routes.use("/auth", auth);

export default routes;
