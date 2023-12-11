import express from "express";
import {
  getDishById,
  getDishWithOffers,
  getDishes,
  getOffers,
  postDish,
} from "../controllers/dish-controller.mjs";
import upload from "../middlewares/upload.mjs";
import { authenticateToken } from "../middlewares/authentication.mjs";

const dishRouter = express.Router();

// routes for '/api/dish'
dishRouter
  .route("/")
  .get(getDishes)
  .post(upload.single("dish_photo"), postDish);
dishRouter.route('/offers')
  .get(authenticateToken, getOffers);
dishRouter.route('/logged')
  .get(authenticateToken, getDishWithOffers);
dishRouter.route("/:id").get(getDishById);


export { dishRouter };
