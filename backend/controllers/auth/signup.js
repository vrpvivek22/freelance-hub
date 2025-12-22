const User = require("../../models/auth-model");
const { BadRequestError } = require("../../errors");
const { StatusCodes } = require("http-status-codes");

const signup = async (req, res, next) => {
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError(
        "User email already exists! Please try with different email"
      );
    }

    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    return res
      .status(StatusCodes.CREATED)
      .json({ success: true, user: { name: user.name, id: user.id }, token });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = signup;
