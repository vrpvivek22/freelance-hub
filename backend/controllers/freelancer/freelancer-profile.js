import Profile from "../../models/freelancer-model/freelancer-profile.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../../errors/index.js";
import FreelancerImage from "../../models/freelancer-model/freelancer-image.js";
import {
  addProfileSchema,
  updateProfileSchema,
} from "../../validation/freelancer/profile-validation.js";

export const getProfile = async (req, res) => {
  const { userId } = req.user;

  const profile = await Profile.findOne({
    createdBy: userId,
  });

  if (!profile) {
    return res.status(200).json({ profile: null });
  }

  const Image = await FreelancerImage.findOne({
    uploadedBy: profile.createdBy,
    role: "freelancer",
  }).sort({ createdAt: -1 });

  profile.profileImage = Image?.url || profile.profileImage;

  res.status(StatusCodes.OK).json({ profile });
};

export const getProfileByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const profile = await Profile.findOne({ createdBy: userId });

    if (!profile) {
      return res.status(StatusCodes.OK).json({ profile: null });
    }

    res.status(StatusCodes.OK).json({ profile });
  } catch (err) {
    console.error("Error fetching freelancer profile:", err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error" });
  }
};

export const addProfile = async (req, res) => {
  const { error } = addProfileSchema.validate(req.body);

  if (error) {
    throw new BadRequestError(error.details[0].message);
  }

  req.body.createdBy = req.user.userId;

  const profile = await Profile.create(req.body);
  res.status(StatusCodes.CREATED).json({
    message: "Profile created successfully",
    profile,
  });
};

export const updateProfile = async (req, res) => {
  const { userId } = req.user;

  const { error } = updateProfileSchema.validate(req.body);

  if (error) {
    throw new BadRequestError(error.details[0].message);
  }

  const profile = await Profile.findOneAndUpdate(
    { createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!profile) {
    throw new NotFoundError("No profile found ");
  }

  res
    .status(StatusCodes.OK)
    .json({ message: "profile updated successfully", profile });
};
