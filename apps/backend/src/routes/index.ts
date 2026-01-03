import { Router } from "express";
import authRoutes from "./auth";
import itemRoutes from "./items";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/item", itemRoutes);

export default rootRouter;
