import express from "express";
export const usersRouter = express.Router();
import { usersController } from "../controllers/users.controller.js";
import { checkAdmin } from "../middlewares/main.js";

usersRouter.get("/", checkAdmin, usersController.readByrender);
usersRouter.post("/create", usersController.registerUser);
usersRouter.post("/updateCart", usersController.updateUserCart);