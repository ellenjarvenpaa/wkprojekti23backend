import express from "express";
import { body } from "express-validator";
import { postLogin } from "../controllers/auth-controller.mjs";
import { postUser } from "../controllers/user-controller.mjs";

const authRouter = express.Router();

// routes for /api/auth

/**
 * POST endpoint for login
 * @name POST/api/auth/login
 * @param {string} membernumber - membernumber of the user
 * @param {string} password - password of the user
 * @returns {object} - object containing user info and token
 * @example response - HTTP 200 OK
 */
authRouter
  .route("/login")
  .post(
    body("membernumber").trim().isLength({ min: 4 }),
    body("password").trim().isLength({ min: 4, max: 4 }),
    postLogin
  );

/**
 * POST endpoint for register
 * @name POST/api/auth/register
 * @param {string} email - email of the user
 * @param {string} password - password of the user
 * @returns {object} - object containing user info and token
 * @example response - HTTP 200 OK
 */
authRouter
  .route("/register")
  .post(
    body("email").trim().isEmail(),
    body("password").trim().isLength({ min: 4, max: 4 }),
    postUser
  );

export { authRouter };
