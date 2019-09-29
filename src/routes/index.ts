import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import homepage from "./homepage";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);

//mine
routes.use("/", homepage);

export default routes;
