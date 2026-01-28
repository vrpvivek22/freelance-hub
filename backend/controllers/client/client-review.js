import Review from "../../models/review-model.js";
import Freelancer from "../../models/freelancer-model/freelancer-profile.js";
import Profile from "../../models/freelancer-model/freelancer-profile.js";

export const ClientReview = async (req, res, next) => {
  try {
    const { freelancerId, projectId, rating, reviewText } = req.body;
    const clientId = req.user.userId;

    const review = await Review.create({
      projectId,

      reviewerId: clientId,
      reviewerRole: "client",

      reviewForId: freelancerId,
      reviewForRole: "freelancer",

      rating,
      reviewText,
    });

    const reviews = await Review.find({
      reviewForId: freelancerId,
      reviewForRole: "freelancer",
    });

    const avg =
      reviews.reduce((a, c) => a + Number(c.rating), 0) / reviews.length;

    await Freelancer.findOneAndUpdate(
      { createdBy: freelancerId },
      {
        averageRating: avg,
        totalReviews: reviews.length,
      }
    );

    res.json({ success: true, review });
  } catch (error) {
    next(error);
  }
};

export const getClientReviews = async (req, res, next) => {
  try {
    const { clientId } = req.params;

    const reviews = await Review.find({
      reviewForId: clientId,
      reviewForRole: "client",
    })
      .populate({
        path: "reviewerId",
        model: "User",
        select: "_id email",
      })
      .sort({ createdAt: -1 })
      .lean();

    for (const r of reviews) {
      const profile = await Profile.findOne(
        { createdBy: r.reviewerId._id },
        "name title country profileImage"
      );

      r.reviewerProfile = profile;
    }

    res.json({ success: true, reviews });
  } catch (error) {
    next(error);
  }
};

