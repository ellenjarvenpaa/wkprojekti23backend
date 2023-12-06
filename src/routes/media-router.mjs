import express from "express";
import multer from "multer";
import { postMedia } from "../controllers/media-controller.mjs";

const mediaRouter = express.Router();
const upload = multer({ dest: "uploads/" });

mediaRouter.route("/").post(upload.single("file"), postMedia);

export default mediaRouter;
