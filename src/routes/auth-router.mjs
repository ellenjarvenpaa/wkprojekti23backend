import express from 'express';
import { body } from 'express-validator';
import { postLogin } from '../controllers/auth-controller.mjs';
import { postUser } from '../controllers/user-controller.mjs';

const authRouter = express.Router();

// routes for /api/auth
authRouter.route('/login')
  .post(
    body('membernumber').trim().isLength({min: 4}),
    body('password').trim().isLength({min: 4, max: 4}),
    postLogin
  );
authRouter.route('/register')
  .post(
    body('email').trim().isEmail(),
    body('password').trim().isLength({min: 4, max: 4}),
    postUser
  );


export {authRouter};
