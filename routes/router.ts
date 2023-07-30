import { Router, Request, Response } from "express";
import user from "../controllers/user";

const router = Router();

router.get("/", user.getUsers);

export { router };
