import { Router } from "express";
import { login, signup } from "../controllers/auth";

const authRoutes: Router = Router();

authRoutes.route("/signup").post(signup);
authRoutes.route("/login").post(login);

export default authRoutes;
