import mongoose from "mongoose";

const FreelancerImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["freelancer"],
      required: true,
      default: "freelancer",
    },
  },
  { timestamps: true }
);

export default mongoose.models.FreelancerImage ||
  mongoose.model("FreelancerImage", FreelancerImageSchema, "freelancer_images");
