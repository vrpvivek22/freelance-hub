import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    projectTitle: {
      type: String,
      required: true,
    },
    projectDetails: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["completed", "inprogress", "pending"],
      required: true,
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
