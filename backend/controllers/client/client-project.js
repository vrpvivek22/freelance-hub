import Project from "../../models/client-model/client-project.js";
import Bid from "../../models/freelancer-model/freelancer-bid.js";
import Profile from "../../models/freelancer-model/freelancer-profile.js";
import Review from "../../models/review-model.js";
import FreelancerImage from "../../models/freelancer-model/freelancer-image.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../../errors/index.js";
import {
  addProjectSchema,
  updateProjectSchema,
} from "../../validation/client/project-validation.js";

export const getAllClientProjects = async (req, res) => {
  const { clientId } = req.params;

  const projects = await Project.find({ createdBy: clientId }).lean();

  if (projects.length === 0) {
    throw new NotFoundError("No project found");
  }

  res.status(StatusCodes.OK).json({ projects });
};

export const getSingleProject = async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findById(projectId);

  if (!project) {
    throw new NotFoundError(`No project found`);
  }

  res.status(StatusCodes.OK).json({ project });
};

export const addProject = async (req, res) => {
  const { error } = addProjectSchema.validate(req.body);

  if (error) {
    throw new BadRequestError(error.details[0].message);
  }

  req.body.createdBy = req.user.userId;

  const project = await Project.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ message: "Project added successfully", project });
};

export const getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({
      createdBy: req.user.userId,
    })
      .sort({ createdAt: -1 })
      .lean();

    const projectIds = projects.map((p) => p._id);

    if (projectIds.length === 0) {
      return res.status(200).json({ projects: [], nbHits: 0 });
    }

    const bids = await Bid.find({
      projectId: { $in: projectIds },
    })
      .populate("freelancerId", "_id email")
      .lean();

    const freelancerIds = bids.map((b) => b.freelancerId?._id);
    const profiles = await Profile.find({
      createdBy: { $in: freelancerIds },
    })
      .select("name profileImage title createdBy")
      .lean();

    const Image = await FreelancerImage.aggregate([
      { $match: { uploadedBy: { $in: freelancerIds }, role: "freelancer" } },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$uploadedBy",
          url: { $first: "$url" },
        },
      },
    ]);

    const ImageMap = {};
    Image.forEach((img) => {
      ImageMap[img._id] = img.url;
    });

    const profileMap = {};
    profiles.forEach((p) => {
      profileMap[p.createdBy] = p;
    });

    const bidMap = {};
    bids.forEach((b) => {
      const prof = profileMap[b.freelancerId?._id] || {};

      const Image = ImageMap[b.freelancerId?._id];

      bidMap[b.projectId] = {
        bidId: b._id,
        bidAmount: b.bidAmount,
        bidStatus: b.status,
        freelancerId: b.freelancerId?._id || null,
        freelancerEmail: b.freelancerId?.email || null,
        freelancerName: prof.name || null,
        freelancerImage: Image || prof.profileImage || null,
        freelancerTitle: prof.title || null,
      };
    });

    const clientReviews = await Review.find({
      reviewerId: req.user.userId,
      reviewerRole: "client",
      projectId: { $in: projectIds },
    }).lean();

    const reviewedMap = {};
    clientReviews.forEach((r) => {
      reviewedMap[r.projectId] = true;
    });

    const finalProjects = projects.map((p) => ({
      projectId: p._id,
      projectTitle: p.projectTitle,
      projectDetails: p.projectDetails,
      requiredSkills: p.requiredSkills,
      budget: p.budget,
      deadline: p.deadline,
      status: p.status,
      postedOn: p.createdAt,
      hasReviewed: reviewedMap[p._id] || false,
      ...bidMap[p._id],
    }));

    res.status(200).json({
      projects: finalProjects,
      nbHits: finalProjects.length,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res) => {
  const {
    user: { userId },
    params: { projectId },
  } = req;

  const { error } = updateProjectSchema.validate(req.body);

  if (error) {
    throw new BadRequestError(error.details[0].message);
  }

  const project = await Project.findOneAndUpdate(
    { _id: projectId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!project) {
    throw new NotFoundError(`No project found with id : ${projectId}`);
  }

  res
    .status(StatusCodes.OK)
    .json({ message: "project updated successfully", project });
};

export const deleteProject = async (req, res) => {
  const {
    user: { userId },
    params: { projectId },
  } = req;

  const project = await Project.findOneAndDelete({
    _id: projectId,
    createdBy: userId,
  });

  if (!project) {
    throw new NotFoundError(`No project found with id : ${projectId}`);
  }

  const Projects = await Project.find({ createdBy: userId }).sort("-createdAt");

  res.status(StatusCodes.OK).json({
    message: "project deleted successfully",
    Projects,
    count: Projects.length,
  });
};
