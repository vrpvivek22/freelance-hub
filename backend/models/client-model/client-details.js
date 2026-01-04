import mongoose from "mongoose";

const DetailsSchema = new mongoose.Schema(
  {
    profileImage: {
      type: String,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
    },
    clientType: {
      type: String,
      enum: ["individual", "agency", "company"],
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Details ||
  mongoose.model("Details", DetailsSchema);
