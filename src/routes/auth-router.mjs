import express from "express";
import { body } from "express-validator";
import { postLogin, postLoginAdmin } from "../controllers/auth-controller.mjs";
import { postAdmin, postUser } from "../controllers/user-controller.mjs";

// routes for /api/auth

const authRouter = express.Router();

authRouter
  .route("/login")
  .post(
    body("membernumber").trim().isLength({ min: 4 }),
    body("password").trim().isLength({ min: 4, max: 4 }),
    postLogin
  )
authRouter
  .route("/login/admin")
  .post(
    body("email").trim().isEmail(),
    body("password").trim().isLength({ min: 4, max: 4 }),
    postLoginAdmin);

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
authRouter
  .route("/register-admin")
  .post(
    body("email").trim().isEmail(),
    body("password").trim().isLength({ min: 4, max: 4 }),
    postAdmin
  );

export { authRouter };
