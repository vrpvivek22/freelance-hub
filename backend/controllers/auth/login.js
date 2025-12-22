const User = require("../../models/auth-model");
const { UnauthenticatedError } = require("../../errors");
const { StatusCodes } = require("http-status-codes");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new UnauthenticatedError("Invalid Credentials");
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Password is incorrect");
    }

    const token = user.createJWT();
    res
      .status(StatusCodes.OK)
      .json({ user: { name: user.name, id: user.id }, token });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = login;
