//products.router.js
import express from "express";
export const productsRouter = express.Router();
import { productsController } from "../controllers/products.controller.js";
import { checkLogin, checkAdmin } from "../middlewares/main.js";


productsRouter.get("/", productsController.readByRenderUser);
// Rutas para productos que requieren autenticación y roles específicos
productsRouter.get("/", checkLogin, productsController.readByRenderUser);
productsRouter.get("/pagination", checkAdmin, productsController.readWithPagination)

export default productsRouter;