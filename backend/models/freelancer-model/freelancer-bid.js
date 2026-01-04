import mongoose from "mongoose";

const BidSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    bidAmount: {
      type: Number,
      required: true,
    },
    coverLetter: {
      type: String,
      required: true,
    },
    projectDelivery: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "inprogress", "completed", "closed", "incomplete"],
      default: "pending",
    },
    freelancerId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Freelancer",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Bid || mongoose.model("Bid", BidSchema);
