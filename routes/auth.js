import express from "express";

import * as AuthController from "../controllers/Auth.controller.js";

const router = express.Router();

router.post("/signup", AuthController.signUp);
router.post("/login", AuthController.login);

export default router;
