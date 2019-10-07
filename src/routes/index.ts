import { Router, Request, Response } from "express";
import clip from "./clip";
import user from "./user";
import rating from "./rating";

const routes = Router();

routes.use("/", clip);
routes.use("/user", user);
routes.use("/rating", rating);

export default routes;
