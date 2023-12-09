import express from "express";
import {
  getDishById,
  getDishes,
  postDish,
  updateDish,
} from "../controllers/dish-controller.mjs";
import upload from "../middlewares/upload.mjs";

const dishRouter = express.Router();

// routes for '/api/dish'
dishRouter
  .route("/")
  .get(getDishes)
  .post(upload.single("dish_photo"), postDish);
dishRouter.route("/:id").get(getDishById).put(updateDish);

export { dishRouter };
