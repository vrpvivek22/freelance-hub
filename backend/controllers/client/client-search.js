import Profile from "../../models/freelancer-model/freelancer-profile.js";
import FreelancerImage from "../../models/freelancer-model/freelancer-image.js";
import { StatusCodes } from "http-status-codes";

export const getProfile = async (req, res) => {
  const { id } = req.params;

  const profile = await Profile.findOne({ createdBy: id });

  if (!profile) {
    return res.status(200).json({ profile: null });
  }

  const Image = await FreelancerImage.findOne({
    uploadedBy: id,
    role: "freelancer",
  }).sort({ createdAt: -1 });

  profile.profileImage = Image?.url || profile.profileImage;

  res.status(200).json({ profile });
};

export const getAllProfiles = async (req, res, next) => {
  try {
    const { title, sort } = req.query;

    const queryObject = {};

    if (title) queryObject.title = { $regex: title, $options: "i" };

    let result = Profile.find(queryObject);

    if (sort) {
      const sortList = sort.split(",").join(" ");
      result = result.sort(sortList);
    } else {
      result = result.sort("-createdAt");
    }

    let profiles = await result.lean();

    for (let p of profiles) {
      p.skills = Array.isArray(p.skills) ? p.skills : [];

      const img = await FreelancerImage.findOne({
        uploadedBy: p.createdBy,
        role: "freelancer",
      }).sort({ createdAt: -1 });

      if (img) {
        p.profileImage = img.url;
      }
    }

    res.status(StatusCodes.OK).json({ profiles, nbHits: profiles.length });
  } catch (error) {
    next(error);
  }
};
