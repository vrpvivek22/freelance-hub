import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    reviewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    reviewForId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    reviewText: {
      type: String,
      required: true,
    },

    reviewerRole: {
      type: String,
      enum: ["client", "freelancer"],
      required: true,
    },

    reviewForRole: {
      type: String,
      enum: ["client", "freelancer"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Review", ReviewSchema);
