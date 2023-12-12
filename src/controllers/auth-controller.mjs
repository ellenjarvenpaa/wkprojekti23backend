import jwt from 'jsonwebtoken';
import { login } from "../models/auth-model.mjs";
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';



// POST api/auth/login, req body includes membernumber and password
const postLogin = async (req, res, next) => {
  // validation errors can be retrieved from the request object
	//(added by express-validator middleware)
	const errors = validationResult(req);
	if(!errors.isEmpty()) {
		console.log(errors.array());
		// pass the error to the error handler middleware
		const error = new Error('invalid input fields');
		error.status = 400;
		return next(error);
	}
  const user = await login(req.body.membernumber);
  console.log('body member', req.body.membernumber);

  // user is undefined (membernumber not found in db)
  if (!user) {
    const error = new Error('member number/password invalid');
		error.status = 401;
		return next(error);
  } else if (user.error) {
      return next(new Error(user.error));
  } else {
    // user found -> compare pw
    const match = await bcrypt.compare(req.body.password, user.password);
    console.log('postLogin', user);
    if (match) {
      //poista pw json ennen palautta
      delete user.password;
      // sign user to my secret chacracters
      const token = jwt.sign(user, process.env.JWT_SECRET);
      res.json({message: "logged in", token, user});
    } else {
      // salasana on väärin
      const error = new Error('username/password invalid');
      error.status = 401;
      return next(error);
    }
  }
}

export {postLogin};
