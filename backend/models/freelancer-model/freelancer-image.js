const mongoose = require("mongoose");

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

module.exports =
  mongoose.models.FreelancerImage ||
  mongoose.model("FreelancerImage", FreelancerImageSchema, "freelancer_images");
