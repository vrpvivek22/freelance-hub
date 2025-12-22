const User = require("../../models/auth-model");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");

const changePassword = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const userId = req.user.userId;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all fields" });
  }

  const user = await User.findById(userId);
  const isMatch = await bcrypt.compare(currentPassword, user.password);

  if (!isMatch) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Current password is incorrect" });
  }

  if (newPassword !== confirmPassword) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "new password and confirm password do not match" });
  } else {
    user.password = newPassword;
    await user.save();
  }

  res.status(StatusCodes.OK).json({ msg: "Password changed successfully" });
};

module.exports = changePassword;
