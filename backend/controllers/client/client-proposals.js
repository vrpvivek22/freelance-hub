import Bid from "../../models/freelancer-model/freelancer-bid.js";
import Profile from "../../models/freelancer-model/freelancer-profile.js";
import FreelancerImage from "../../models/freelancer-model/freelancer-image.js";

export const getProposals = async (req, res) => {
  const projectId = req.params.projectId;

  const proposals = await Bid.find({ projectId })
    .populate("freelancerId", "_id")
    .lean();

  const freelancerIds = proposals.map((p) => p.freelancerId?._id);

  const profiles = await Profile.find({
    createdBy: { $in: freelancerIds },
  })
    .select(
      "name skills country averageRating totalReviews profileImage title createdBy"
    )
    .lean();

  const Image = await FreelancerImage.aggregate([
    { $match: { uploadedBy: { $in: freelancerIds }, role: "freelancer" } },
    { $sort: { createdAt: -1 } },
    {
      $group: {
        _id: "$uploadedBy",
        url: { $first: "$url" },
      },
    },
  ]);

  const ImageMap = {};
  Image.forEach((img) => {
    ImageMap[img._id] = img.url;
  });

  const profileMap = {};
  profiles.forEach((p) => {
    profileMap[p.createdBy] = p;
  });

  const formattedProposals = proposals.map((p) => {
    const prof = profileMap[p.freelancerId?._id] || {};

    const Image = ImageMap[p.freelancerId?._id];
    return {
      bidId: p._id,
      bidAmount: p.bidAmount,
      bidStatus: p.status,
      coverLetter: p.coverLetter,
      projectDelivery: p.projectDelivery,
      freelancerId: p.freelancerId?._id || null,
      freelancerName: prof.name || null,
      freelancerSkills: prof.skills || [],
      freelancerRating: prof.averageRating || null,
      freelancerTotalReviews: prof.totalReviews || null,
      freelancerCountry: prof.country || null,
      freelancerImage: Image || prof.profileImage || null,
      freelancerTitle: prof.title || null,
    };
  });

  res.status(200).json({
    proposals: formattedProposals,
  });
};
