import express from "express";
import { getDishById, getDishes } from "../controllers/dish-controller.mjs";

const dishRouter = express.Router();

// routes for '/api/dish'
dishRouter.route('/')
  .get(getDishes);
dishRouter.route('/:id')
  .get(getDishById);

export {dishRouter};
