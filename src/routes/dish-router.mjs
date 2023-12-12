import express from "express";
import {
  getDishById,
  getDishWithOffers,
  getDishes,
  getOffers,
  postDish,
  updateDish,
  deleteDish,
} from "../controllers/dish-controller.mjs";
import upload from "../middlewares/upload.mjs";
import { authenticateToken } from "../middlewares/authentication.mjs";

const dishRouter = express.Router();

// routes for '/api/dish'

/**
 * GET endpoint for dishes
 * @name GET/api/dish
 * @returns {object} - object containing list of menu according to categories
 * @example response - HTTP 200 OK
 *
 */
dishRouter
  .route("/")
  .get(getDishes)
  .post(upload.single("dish_photo"), postDish)
  .put(upload.single("dish_photo"), updateDish);

/**
 * GET endpoint for offers
 * @name GET/api/dish/offers
 * @returns {object} - object containing list of offers
 * @example response - HTTP 200 OK
 *
 */
dishRouter.route("/offers").get(authenticateToken, getOffers);

/**
 * GET endpoint for dishes with offers
 * @name GET/api/dish/logged
 * @returns {object} - object containing list of menu according to categories
 * @example response - HTTP 200 OK
 */
dishRouter.route("/logged").get(authenticateToken, getDishWithOffers);

/**
 * GET endpoint for dishes by id
 * @name GET/api/dish/:id
 * @param {number} id - dish id
 * @returns {object} - object containing dish info
 * @example response - HTTP 200 OK
 */
dishRouter.route("/:id").get(getDishById).put(updateDish).delete(deleteDish);

export { dishRouter };
