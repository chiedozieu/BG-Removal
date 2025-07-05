import express from "express";
import { removeBackgroundImage } from "../controllers/image.controller.js";
import upload from "../middlewares/multer.js";
import authUser from "../middlewares/auth.js";

const imageRouter = express.Router();

imageRouter.post(
  "/remove-bg",
  upload.single("image"),
  authUser,
  removeBackgroundImage
);

export default imageRouter;
