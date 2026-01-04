import Details from "../../models/client-model/client-details.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../../errors/index.js";
import ClientImage from "../../models/client-model/client-image.js";

export const getDetails = async (req, res) => {
  const { userId } = req.user;

  const details = await Details.findOne({ createdBy: userId });

  if (!details) {
    return res.status(200).json({ profile: null });
  }

  const Image = await ClientImage.findOne({
    uploadedBy: details.createdBy,
    role: "client",
  }).sort({ createdAt: -1 });

  details.profileImage = Image?.url || details.profileImage || null;

  res.status(StatusCodes.OK).json({ details });
};

export const getDetailsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const details = await Details.findOne({ createdBy: userId });

    if (!details) {
      return res.status(StatusCodes.OK).json({ details: null });
    }

    res.status(StatusCodes.OK).json({ details });
  } catch (err) {
    console.error("Error fetching client details:", err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error" });
  }
};

export const addDetails = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const details = await Details.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ message: "details added successfully", details });
};

export const updateDetails = async (req, res) => {
  const { userId } = req.user;

  const details = await Details.findOneAndUpdate(
    { createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!details) {
    throw new NotFoundError("No details found for this user");
  }

  res
    .status(StatusCodes.OK)
    .json({ message: "Details updated successfully", details });
};

export const deleteDetails = async (req, res) => {
  const { userId } = req.user;

  const details = await Details.findOneAndDelete({ createdBy: userId });

  if (!details) {
    throw new NotFoundError("No details found to delete");
  }
  const clientDetails = await Details.find({ createdBy: userId }).sort(
    "-createdAt"
  );

  res.status(StatusCodes.OK).json({
    message: "details deleted successfully",
    clientDetails,
    count: clientDetails.length,
  });
};
