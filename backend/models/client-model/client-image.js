const mongoose = require("mongoose");

const ClientImageSchema = new mongoose.Schema(
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
      enum: ["client"],
      required: true,
      default: "client",
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.ClientImage ||
  mongoose.model("ClientImage", ClientImageSchema, "client_images");
