import express from "express";
import { getDishes } from "../controllers/dish-controller.mjs";

const dishRouter = express.Router();

dishRouter.route('/').get(getDishes);

export {dishRouter};
