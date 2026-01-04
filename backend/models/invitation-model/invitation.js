import mongoose from "mongoose";

const invitationSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    freelancerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Invitation", invitationSchema);
