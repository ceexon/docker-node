import express from "express";

import * as PostController from "../controllers/Post.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(PostController.all).post(protect, PostController.create);
router
  .route("/:id")
  .get(PostController.find)
  .put(protect, PostController.update)
  .delete(protect, PostController.destroy);

export default router
