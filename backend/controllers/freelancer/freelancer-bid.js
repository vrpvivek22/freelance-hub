import mongoose from "mongoose";
import Bid from "../../models/freelancer-model/freelancer-bid.js";
import Project from "../../models/client-model/client-project.js";
import Details from "../../models/client-model/client-details.js";
import Review from "../../models/review-model.js";
import ClientImage from "../../models/client-model/client-image.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../../errors/index.js";
import {
  bidSchema,
  updateBidSchema,
} from "../../validation/freelancer/bids-validation.js";

export const bidProject = async (req, res) => {
  const { bidAmount, coverLetter, projectDelivery } = req.body;

  const { error } = bidSchema.validate({
    bidAmount,
    coverLetter,
    projectDelivery,
  });

  if (error) {
    throw new BadRequestError(error.details[0].message);
  }

  const freelancerId = req.user.userId;
  const projectId = req.params.projectId;

  const project = await Project.findById(projectId);

  if (!project) {
    throw new NotFoundError("Project not found");
  }

  const existingBid = await Bid.findOne({
    projectId,
    freelancerId,
  });

  if (existingBid) {
    throw new BadRequestError("You have already placed a bid on this project");
  }

  const bid = await Bid.create({
    projectId: new mongoose.Types.ObjectId(projectId),
    clientId: project.clientId,
    freelancerId,
    bidAmount,
    coverLetter,
    projectDelivery,
  });
  res
    .status(StatusCodes.CREATED)
    .json({ message: " Bid placed successfully", bid });
};

export const updateBid = async (req, res) => {
  const {
    user: { userId },
    params: { projectId },
  } = req;

  const { error } = updateBidSchema.validate(req.body);

  if (error) {
    throw new BadRequestError(error.details[0].message);
  }

  const bid = await Bid.findOneAndUpdate(
    { projectId, freelancerId: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!bid) {
    throw new NotFoundError(
      `No bid found with id : ${projectId} and freelancerId:${userId}`
    );
  }

  res
    .status(StatusCodes.OK)
    .json({ message: "your bid has been updated successfully", bid });
};

export const getMyBidProjects = async (req, res) => {
  const freelancerId = req.user.userId;

  const bids = await Bid.find({ freelancerId })
    .populate({
      path: "projectId",
      populate: {
        path: "createdBy",
        select: "_id",
      },
    })
    .sort({ createdAt: -1 })
    .lean();

  const clientIds = bids
    .map((b) => b.projectId?.createdBy?._id)
    .filter(Boolean);

  const Image = await ClientImage.aggregate([
    { $match: { uploadedBy: { $in: clientIds }, role: "client" } },
    { $sort: { createdAt: -1 } },
    {
      $group: {
        _id: "$uploadedBy",
        url: { $first: "$url" },
      },
    },
  ]);

  const imageMap = {};
  Image.forEach((img) => {
    imageMap[img._id] = img.url;
  });

  const clientDetails = await Details.find({
    createdBy: { $in: clientIds },
  })
    .select("name profileImage createdBy")
    .lean();

  const detailsMap = {};
  clientDetails.forEach((d) => {
    detailsMap[d.createdBy] = d;
  });

  const projectIds = bids.map((b) => b.projectId?._id).filter(Boolean);

  const reviews = await Review.find({
    reviewerId: freelancerId,
    reviewerRole: "freelancer",
    projectId: { $in: projectIds },
  }).lean();

  const reviewedMap = {};
  reviews.forEach((r) => {
    reviewedMap[r.projectId] = true;
  });

  const formatted = bids.map((b) => {
    const projectId = b.projectId?._id;
    const clientId = b.projectId?.createdBy?._id;
    const details = detailsMap[clientId] || {};

    return {
      bidId: b._id,
      bidStatus: b.status,
      bidAmount: b.bidAmount,
      coverLetter: b.coverLetter,
      projectDelivery: b.projectDelivery,
      project: b.projectId,

      clientId,
      clientName: details.name || "",
      clientImage: imageMap[clientId] || details.profileImage || "",

      hasReviewed: reviewedMap[projectId] || false,
    };
  });

  res.status(200).json({ bids: formatted });
};

export const getBidProjects = async (req, res) => {
  const { freelancerId } = req.params;

  const bids = await Bid.find({ freelancerId });

  if (!bids) {
    throw new NotFoundError("No bids found");
  }

  res.status(200).json({ bids });
};

export const withdrawBid = async (req, res) => {
  const {
    user: { userId },
    params: { bidId },
  } = req;

  const bid = await Bid.findOneAndDelete({
    _id: bidId,
    freelancerId: userId,
  });

  if (!bid) {
    throw new NotFoundError(`No bid found with id : ${bidId}`);
  }

  const bids = await Bid.find({ freelancerId: userId }).sort("-createdAt");

  res.status(StatusCodes.OK).json({
    message: "your bid has been withdrawn successfully",
    bids,
    count: bids.length,
  });
};
