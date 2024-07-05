import express from "express";
export const home = express.Router();
import { logger } from "../utils/main.js";

home.get("/", async (req, res) => {
	try {
		const title = "Fuego Burgers®";
		const { first_name, last_name, role } = req.session.user;
		return res.status(200).render("home", { title, first_name, last_name, role });
	} catch (e) {
		logger.error(e.message);
		res.status(501).send({ status: "error", msg: "Error en el servidor", error: e });
	}
});
