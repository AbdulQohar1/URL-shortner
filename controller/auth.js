const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');
// const jwt = require('jsonwebtoken');


const register = async (req , res) => {
  const user = await User.create({ ...req.body });

  const token = user.createToken();
  res.status(StatusCodes.CREATED).json({ 
    user: {name: user.name}, 
    token
  });
};

const login = async (req , res) => {
  const { email, password} = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password!')
  };

  const user = await User.findOne({ email});
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  };

  // compare password
  const passwordVerification = await user.comparePassword(password);
  if (!passwordVerification) {
    throw new UnauthenticatedError('Invalid Credentials!')
  };
 
  const token = user.createToken();
  res.status(StatusCodes.OK).json({
    user: {name: user.name},
    token 
  });

};

module.exports = {
  register,
  login,
}