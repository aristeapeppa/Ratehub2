import { Router } from "express";
  import HomepageController from "../controllers/homepage";

  const router = Router();

  //Get all users
  router.get("/", HomepageController.listAll);

  export default router;
