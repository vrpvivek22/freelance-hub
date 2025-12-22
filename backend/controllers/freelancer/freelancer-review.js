const Review = require("../../models/review-model");
const Client = require("../../models/client-model/client-details");
const Details = require("../../models/client-model/client-details");

const FreelancerReview = async (req, res, next) => {
  try {
    const { clientId, projectId, rating, reviewText } = req.body;
    const freelancerId = req.user.userId;

    const review = await Review.create({
      projectId,

      reviewerId: freelancerId,
      reviewerRole: "freelancer",

      reviewForId: clientId,
      reviewForRole: "client",

      rating,
      reviewText,
    });

    const reviews = await Review.find({
      reviewForId: clientId,
      reviewForRole: "client",
    });
    const avg =
      reviews.reduce((a, c) => a + Number(c.rating), 0) / reviews.length;

    await Client.findOneAndUpdate(
      { createdBy: clientId },
      {
        averageRating: avg,
        totalReviews: reviews.length,
      },
      { new: true }
    );

    res.json({ success: true, review });
  } catch (error) {
    next(error);
  }
};

const getFreelancerReviews = async (req, res, next) => {
  try {
    const { freelancerId } = req.params;

    const reviews = await Review.find({
      reviewForId: freelancerId,
      reviewForRole: "freelancer",
    })
      .populate({
        path: "reviewerId",
        model: "User",
        select: "_id email",
      })
      .sort({ createdAt: -1 })
      .lean();

    for (const r of reviews) {
      const profile = await Details.findOne(
        { createdBy: r.reviewerId._id },
        "name country profileImage"
      );

      r.reviewerProfile = profile;
    }

    res.json({ success: true, reviews });
  } catch (error) {
    next(error);
  }
};

module.exports = { FreelancerReview, getFreelancerReviews };
